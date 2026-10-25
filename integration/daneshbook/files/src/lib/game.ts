/**
 * پیکربندی «بازی بیژن» (گربه‌ای در خیابان) در دانش‌بوک.
 *
 * بازی یک اپ آرکید مستقل است؛ خروجی تک‌فایلی‌اش داخل
 * `public/games/bijan/index.html` سرو می‌شود (همه JS/CSS/فونت داخل همان فایل
 * inline است) و در صفحه‌ی `/bijan` داخل iframe اجرا می‌شود.
 *
 * اگر بازی روی دامنه‌ی جدا میزبانی شد (مثلاً نسخه‌ی دیپلوی‌شده‌ی ریپوی بازی روی
 * Vercel)، فقط کافی است `BIJAN_GAME_URL` را روی همان آدرس تنظیم کنید؛ هیچ
 * تغییری در کد لازم نیست. (نسخه‌ی `NEXT_PUBLIC_...` هم پشتیبانی می‌شود، ولی
 * آن یکی هنگام build ثابت می‌شود و با تغییر env بدون rebuild عوض نمی‌شود.)
 */
export const GAME = {
  /** صفحه‌ی میزبان بازی در دانش‌بوک (مقصد بنر صفحه‌ی اصلی) */
  page: "/bijan",
  name: "بیژن؛ گربه‌ای در خیابان",
  shortName: "بیژن",
  tagline: "آرکید نئونی رایگان — بدون نصب، همین‌جا بازی کن",
  /** تصویر مربعی برای بنر نازک و کارت‌های کوچک */
  thumb: "/images/bijan/bijan-thumb.jpg",
  /** تصویر عریض برای هدر صفحه‌ی بازی */
  hero: "/images/bijan/bijan-hero.jpg",
  /** کارت اشتراک‌گذاری ۱۲۰۰×۶۳۰ */
  og: "/images/bijan/bijan-og.jpg",
  /** مسیر پیش‌فرض فایل استاتیک بازی */
  defaultSrc: "/games/bijan/index.html",
} as const;

/**
 * آدرس iframe بازی.
 *
 * مسیر پیش‌فرض همان فایل استاتیک داخل `public` است؛ چون همه‌ی دارایی‌های بازی
 * درون همان HTML inline شده‌اند، `/games/bijan/index.html` هم روی `next dev` و
 * هم روی Vercel بدون هیچ تنظیمی کار می‌کند.
 */
export function gameSrc(): string {
  const configured = (
    process.env.BIJAN_GAME_URL ??
    process.env.NEXT_PUBLIC_BIJAN_GAME_URL ??
    ""
  ).trim();
  return configured || GAME.defaultSrc;
}
