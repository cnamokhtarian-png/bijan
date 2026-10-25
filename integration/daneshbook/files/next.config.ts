import type { NextConfig } from "next";

/**
 * اگر بازی روی دامنه‌ی جدا میزبانی شود، مبدأ آن باید در frame-src باشد وگرنه
 * مرورگر iframe صفحه‌ی /bijan را بلاک می‌کند. با همان متغیر BIJAN_GAME_URL
 * ساخته می‌شود؛ برای مسیر داخلی (پیش‌فرض) چیزی اضافه نمی‌شود.
 */
function externalGameOrigin(): string | null {
  const configured = (
    process.env.BIJAN_GAME_URL ??
    process.env.NEXT_PUBLIC_BIJAN_GAME_URL ??
    ""
  ).trim();
  if (!configured || configured.startsWith("/")) return null;
  try {
    return new URL(configured).origin;
  } catch {
    return null;
  }
}

/**
 * هدرهای امنیتی پایه. قبلاً هیچ‌کدام تنظیم نشده بود.
 * CSP عمداً انعطاف‌پذیر است (inline style مجاز) تا ظاهر فعلی سایت نشکند.
 * `frame-src` برای قاب بازی «بیژن» در صفحه‌ی /bijan لازم است.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self'",
      `frame-src 'self' blob:${externalGameOrigin() ? ` ${externalGameOrigin()}` : ""}`,
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
