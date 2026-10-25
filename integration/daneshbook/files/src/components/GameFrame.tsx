"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

/**
 * قاب بازی.
 *
 * بازی یک HTML مستقل است، پس اینجا فقط داخل iframe اجرا می‌شود. مزیت iframe:
 * استایل و کلیدهای بازی با سایت تداخل نمی‌کند، اسکرول صفحه قفل نمی‌شود و
 * رکوردها در localStorage همان دامنه می‌مانند.
 *
 * امکانات: نمایش حالت بارگذاری، شروع دوباره، تمام‌صفحه و باز کردن در تب تازه.
 * روی iOS که Fullscreen API برای div ندارد، دکمه‌ی تمام‌صفحه به‌جای خطا تب
 * جدید را باز می‌کند.
 */
export default function GameFrame({
  src,
  title,
  poster,
  className = "",
}: {
  src: string;
  title: string;
  poster?: string;
  className?: string;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", sync);
    sync();
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const shell = shellRef.current;
    if (!shell) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      if (typeof shell.requestFullscreen === "function") {
        await shell.requestFullscreen();
        return;
      }
      throw new Error("fullscreen-unsupported");
    } catch {
      window.open(src, "_blank", "noopener,noreferrer");
    }
  }, [src]);

  const restart = useCallback(() => {
    setLoaded(false);
    setRunKey((key) => key + 1);
  }, []);

  const iconButton =
    "grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-cream/70 transition hover:border-coral/40 hover:bg-white/10 hover:text-cream";

  return (
    <div
      ref={shellRef}
      className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-night shadow-2xl shadow-ink-900/25 ${
        fullscreen ? "flex h-screen w-screen flex-col rounded-none border-0" : ""
      } ${className}`}
    >
      {/* نوار ابزار */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-night-2 px-3 py-2">
        <span className="flex items-center gap-1.5 text-[10.5px] font-bold text-cream/60">
          <span className="size-2 rounded-full bg-coral" />
          داخل دانش‌بوک اجرا می‌شود
        </span>

        <div className="ms-auto flex items-center gap-1.5">
          <button type="button" onClick={restart} className={iconButton} title="شروع دوباره" aria-label="شروع دوباره بازی">
            <Icon name="exchange" className="size-4" />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className={iconButton}
            title={fullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"}
            aria-label={fullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"}
          >
            <Icon name="expand" className="size-4" />
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={iconButton}
            title="باز کردن بازی در تب جدید"
            aria-label="باز کردن بازی در تب جدید"
          >
            <Icon name="external" className="size-4" />
          </a>
        </div>
      </div>

      <div className={`relative w-full bg-night ${fullscreen ? "flex-1" : "h-[clamp(26rem,68dvh,44rem)]"}`}>
        <iframe
          key={runKey}
          src={src}
          title={title}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          loading="lazy"
        />

        {/* حالت بارگذاری — تا اولین فریم بازی، جای خالی دیده نشود */}
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center overflow-hidden bg-night">
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full scale-105 object-cover opacity-25 blur-[2px]"
              />
            )}
            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <span className="size-9 animate-spin rounded-full border-2 border-cream/15 border-t-coral" />
              <p className="text-[12px] font-bold text-cream/80">در حال آماده‌سازی خیابان…</p>
              <p className="text-[10.5px] text-cream/45">اولین بار ممکن است چند ثانیه طول بکشد</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
