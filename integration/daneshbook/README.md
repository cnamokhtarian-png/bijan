# اتصال بازی به دانش‌بوک

این پوشه همه‌ی تغییرات لازم برای افزودن بازی **بیژن؛ گربه‌ای در خیابان** به سایت
`danesh_book3096-final` را در خود دارد — به‌صورت آماده، چون توکن گیت‌هاب این محیط فقط
به مخزن `bijan` دسترسی داشت و امکان پوش مستقیم به مخزن دانش‌بوک نبود.

## سه راه (یکی را انتخاب کنید)

### ۱) اسکریپت خودکار (ساده‌ترین)

```bash
# داخل ریپوی bijan
./integration/daneshbook/apply.sh ../danesh_book3096-final
```

اسکریپت فایل‌ها را کپی می‌کند، بازی را build می‌کند و خروجی تک‌فایلی را در
`public/games/bijan/index.html` می‌گذارد.

### ۲) با پچ گیت

```bash
cd ../danesh_book3096-final
git checkout -b feature/bijan-game
git apply --binary /path/to/bijan/integration/daneshbook/daneshbook-bijan.patch

# فایل بازی را از ریپوی bijan بسازید و کنارش بگذارید:
cd ../bijan && npm install && npm run build
mkdir -p ../danesh_book3096-final/public/games/bijan
cp dist/index.html ../danesh_book3096-final/public/games/bijan/index.html
```

> در پچ، فایل ۴۶۰ کیلوبایتی بازی عمداً نیست (خروجی build است)؛ همان دو دستور آخر
> آن را می‌سازد.

### ۳) کپی دستی

همه‌ی فایل‌های نهایی داخل `files/` با همان ساختار مسیر مخزن دانش‌بوک هستند:

```
files/
├─ src/app/bijan/page.tsx            ← صفحه‌ی بازی
├─ src/components/GameBanner.tsx     ← بنر نازک صفحه‌ی خانه
├─ src/components/GameFrame.tsx      ← قاب iframe
├─ src/lib/game.ts                   ← پیکربندی آدرس/تصاویر بازی
├─ src/app/page.tsx                  ← (تغییر) درج بنر بالای بنر اصلی
├─ src/app/globals.css               ← (تغییر) پالت رنگ بازی
├─ src/components/Icon.tsx           ← (تغییر) سه آیکون تازه
├─ src/lib/constants.ts              ← (تغییر) لینک «بازی بیژن» در منو
├─ src/app/sitemap.ts                ← (تغییر) افزودن /bijan
├─ next.config.ts                    ← (تغییر) frame-src در CSP
├─ public/images/bijan/*             ← تصویر بنر، هدر و OG
├─ docs/bijan-game.md                ← مستندات
├─ README.md                         ← (تغییر) بخش بازی
└─ .env.example                      ← (تغییر) توضیح BIJAN_GAME_URL
```

## بعد از اعمال

```bash
npm run typecheck && npm run lint && npm run build
npm run dev   # /
```

- صفحه‌ی خانه: یک بنر نازک تیره با تصویر بازی، بالای بنر اصلی.
- `/bijan`: هدر تصویری + قاب بازی + راهنمای کنترل‌ها.

## میزبانی روی دامنه‌ی جدا (اختیاری)

اگر خواستید بازی مستقل روی Vercel باشد (همین ریپوی `bijan` را دیپلوی کنید)، در دانش‌بوک فقط
این متغیر را تنظیم کنید:

```env
BIJAN_GAME_URL=https://<game-deployment>.vercel.app
```

`src/lib/game.ts` همین آدرس را در iframe می‌گذارد و `next.config.ts` خودکار همان مبدأ را به
`frame-src` اضافه می‌کند. بدون این متغیر، بازی از فایل داخلی
`public/games/bijan/index.html` سرو می‌شود.

## چرا iframe؟

بازی یک اپ مستقل است (React + Canvas). داخل iframe: استایل تیره‌اش با تم روشن سایت قاطی
نمی‌شود، `overflow: hidden` و کلیدهای بازی صفحه‌ی سایت را قفل نمی‌کنند، و رکوردهای بازیکن در
`localStorage` همان مبدأ می‌مانند.
