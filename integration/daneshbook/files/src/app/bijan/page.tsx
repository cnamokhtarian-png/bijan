import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GameFrame from "@/components/GameFrame";
import { Icon, type IconName } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { GAME, gameSrc } from "@/lib/game";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "بازی آرکید مرورگری «بیژن»: گربه‌ای نارنجی با شال قرمز در خیابان‌های نئونی شب. بپر، سُر بخور، ماهی جمع کن و نُه جانت را بسنج. رایگان، بدون نصب، همین‌جا در دانش‌بوک.";

export const metadata: Metadata = {
  title: "بازی بیژن؛ گربه‌ای در خیابان",
  description: DESCRIPTION,
  keywords: ["بازی مرورگری", "بازی آرکید", "بازی رایگان", "بازی گربه", "بازی موبایل", "دانش‌بوک"],
  alternates: { canonical: GAME.page },
  openGraph: {
    type: "website",
    title: `${GAME.name} | دانش‌بوک`,
    description: DESCRIPTION,
    url: GAME.page,
    images: [
      {
        url: GAME.og,
        width: 1200,
        height: 630,
        alt: `${GAME.name} — بازی آرکید دانش‌بوک`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${GAME.name} | دانش‌بوک`,
    description: DESCRIPTION,
    images: [GAME.og],
  },
};

const CONTROLS: { icon: IconName; title: string; keys: string; desc: string }[] = [
  {
    icon: "bolt",
    title: "پرش و پرش دوبل",
    keys: "فاصله · ↑ · تپ",
    desc: "وسط هوا دوباره بزن تا بالاتر بروی و از ترافیک رد شوی.",
  },
  {
    icon: "exchange",
    title: "سُر و سقوط سریع",
    keys: "↓ · S · سوایپ پایین",
    desc: "زیر داربست، کبوترها و موانع کم‌ارتفاع خودت را جمع کن.",
  },
  {
    icon: "sparkles",
    title: "غوغا",
    keys: "F · لمس مخزن",
    desc: "وقتی مخزن پر شد: شکست‌ناپذیر، آهنربای ماهی و امتیاز دوبرابر.",
  },
];

export default function BijanGamePage() {
  const src = gameSrc();

  // داده ساختاریافته بازی — برای این‌که گوگل صفحه را به‌عنوان بازی بشناسد
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: GAME.name,
    alternateName: "Bijan — Street Cat",
    url: absoluteUrl(GAME.page),
    image: absoluteUrl(GAME.og),
    description: DESCRIPTION,
    inLanguage: "fa-IR",
    genre: ["Arcade", "Endless runner"],
    gamePlatform: "Web browser",
    playMode: "SinglePlayer",
    applicationCategory: "Game",
    operatingSystem: "Any",
    publisher: { "@type": "Organization", name: "دانش‌بوک", url: absoluteUrl("/") },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="animate-fade-up space-y-6">
      <JsonLd data={gameSchema} />

      {/* ------------------------------- hero ------------------------------- */}
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-night">
        <Image
          src={GAME.hero}
          alt="بیژن، گربه‌ی نارنجی با شال قرمز، در حال پرش میان خیابان نئونی شب"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 72rem"
          className="-z-10 object-cover object-center opacity-85"
        />
        {/* سایه‌ی خوانایی: از سمت شروع (راست) تیره به سمت چپ روشن */}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(270deg,rgba(10,13,20,0.96)_0%,rgba(10,13,20,0.86)_38%,rgba(10,13,20,0.45)_68%,rgba(10,13,20,0.15)_100%)]"
          aria-hidden="true"
        />

        <div className="relative px-5 py-8 text-cream sm:px-9 sm:py-11">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] px-3 py-1.5 text-[11px] font-bold text-cream/85 backdrop-blur-sm">
            <Icon name="gamepad" className="size-3.5 text-mint" />
            بازی آرکید دانش‌بوک
            <span className="h-3 w-px bg-cream/20" />
            <span className="text-coral">جدید</span>
          </span>

          <h1 className="mt-4 max-w-xl text-[2rem] leading-[1.3] font-extrabold tracking-tight text-cream sm:text-[2.7rem]">
            بیژن؛{" "}
            <span className="bg-gradient-to-l from-coral via-amber to-coral bg-clip-text text-transparent">
              گربه‌ای در خیابان
            </span>
          </h1>

          <p className="mt-3 max-w-lg text-[13px] leading-8 text-cream/75 sm:text-[14px]">
            شب است و شهر خواب ندارد. بیژن با شال قرمزش از ترافیک شبانه فرار می‌کند، ماهی جمع می‌کند
            و نُه جانش را می‌سنجد. بازی همین‌جا، داخل دانش‌بوک، اجرا می‌شود — بدون نصب و بدون ثبت‌نام.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a
              href="#play"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-coral to-coral-deep px-5 py-2.5 text-[13px] font-black text-[#1a0d08] shadow-lg shadow-coral/30 transition hover:-translate-y-0.5"
            >
              <Icon name="bolt" className="size-4" />
              شروع بازی
            </a>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-2xl border border-cream/20 bg-cream/[0.06] px-4 py-2.5 text-[12.5px] font-bold text-cream/85 transition hover:border-cream/40 hover:text-cream"
            >
              <Icon name="back" className="size-4 rotate-180" />
              برگشت به بازار کتاب
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10.5px] font-semibold text-cream/55">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="size-3.5 text-mint" />
              موبایل و دسکتاپ
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="size-3.5 text-mint" />
              بدون نصب و بدون ثبت‌نام
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="size-3.5 text-mint" />
              رکوردها روی همین مرورگر می‌مانند
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------- game ------------------------------- */}
      <section id="play" className="scroll-mt-24">
        <GameFrame src={src} title={GAME.name} poster={GAME.hero} />

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] font-medium text-ink-400 sm:hidden">
          <Icon name="expand" className="size-3.5" />
          برای تجربه‌ی بهتر، گوشی را افقی بگیرید یا دکمه‌ی تمام‌صفحه را بزنید.
        </p>
      </section>

      {/* ----------------------------- how to play -------------------------- */}
      <section className="grid gap-3 sm:grid-cols-3">
        {CONTROLS.map((item) => (
          <div key={item.title} className="card-surface p-4">
            <span className="grid size-9 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon name={item.icon} className="size-4.5" />
            </span>
            <h2 className="mt-3 text-[14px] font-extrabold text-ink-900">{item.title}</h2>
            <p className="mt-1 text-[11.5px] font-medium text-ink-400">{item.keys}</p>
            <p className="mt-2 text-[12px] leading-7 text-ink-600">{item.desc}</p>
          </div>
        ))}
      </section>

      <p className="flex items-start gap-2 rounded-2xl border border-ink-100 bg-white p-4 text-[11.5px] leading-6 text-ink-600">
        <Icon name="alert" className="mt-0.5 size-4 shrink-0 text-amber-500" />
        <span>
          بازی روی صفحه‌ی موبایل هم اجرا می‌شود؛ برای بازی با کیبورد، اول یک‌بار داخل قاب بازی کلیک
          کنید. اگر بازی باز نشد یا کند بود، از دکمه‌ی «باز کردن در تب جدید» بالای قاب استفاده کنید.
        </span>
      </p>
    </div>
  );
}
