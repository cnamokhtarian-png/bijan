import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { GAME } from "@/lib/game";

/**
 * بنر نازک تبلیغاتی بازی «بیژن» — بالای بنر اصلی صفحه‌ی خانه.
 *
 * عمداً کوتاه است (یک ردیف) تا بنر اصلی سایت را کنار نزند؛ کل نوار یک لینک
 * است و به صفحه‌ی `/bijan` می‌رود. تصویر با next/image سرو می‌شود و به‌صورت
 * خودکار برای موبایل سبک‌تر می‌شود.
 */
export default function GameBanner({ className = "" }: { className?: string }) {
  return (
    <Link
      href={GAME.page}
      aria-label={`${GAME.name} — بازی کن`}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-night px-2.5 py-2 text-cream ring-1 ring-inset ring-white/12 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-coral/25 hover:ring-coral/40 sm:gap-4 sm:px-3.5 ${className}`}
    >
      {/* هاله‌ی نئونی و درخشش عبوری */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -start-6 top-1/2 size-32 -translate-y-1/2 rounded-full bg-coral/25 blur-2xl transition group-hover:bg-coral/40"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -start-1/3 w-1/3 -skew-x-12 bg-gradient-to-l from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:start-full group-hover:opacity-100"
      />

      <span className="relative shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20 sm:rounded-[0.95rem]">
        <Image
          src={GAME.thumb}
          alt={`${GAME.name} — تصویر بازی`}
          width={128}
          height={128}
          sizes="64px"
          className="size-11 object-cover transition-transform duration-500 group-hover:scale-110 sm:size-13"
        />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-l from-coral to-coral-deep px-1.5 py-0.5 text-[9px] font-black text-[#1a0d08] shadow-sm">
            <Icon name="sparkles" className="size-2.5" />
            بازی جدید
          </span>
          <span className="truncate text-[12.5px] font-extrabold text-cream sm:text-[13.5px]">
            {GAME.name}
          </span>
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 truncate text-[10.5px] font-medium text-cream/65 sm:text-[11.5px]">
          <Icon name="gamepad" className="size-3.5 shrink-0 text-mint" />
          <span className="truncate">{GAME.tagline}</span>
        </span>
      </span>

      <span className="relative ms-auto flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-l from-coral to-coral-deep px-2.5 py-2 text-[11.5px] font-black text-[#1a0d08] shadow-lg shadow-coral/25 transition group-hover:brightness-110 sm:px-3.5">
        <span className="hidden sm:inline">بازی کن</span>
        <Icon name="back" className="size-4" />
      </span>
    </Link>
  );
}
