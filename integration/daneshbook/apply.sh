#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# اتصال بازی «بیژن» به دانش‌بوک
#
#   ./integration/daneshbook/apply.sh /path/to/danesh_book3096-final
#
# کارهایی که انجام می‌دهد:
#   ۱) همه‌ی فایل‌های لازم (کامپوننت‌ها، صفحه‌ی /bijan، تصاویر، مستندات) را در
#      مخزن دانش‌بوک کپی می‌کند.
#   ۲) بازی را build می‌کند و خروجی تک‌فایلی را در
#      public/games/bijan/index.html می‌گذارد.
#
# نگران نباشید: هیچ فایل قدیمی حذف نمی‌شود؛ فقط فایل‌های همین قابلیت
# اضافه/به‌روزرسانی می‌شوند. قبل از اجرا یک commit بزنید تا diff را ببینید.
# ---------------------------------------------------------------------------
set -euo pipefail

TARGET="${1:-}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GAME_ROOT="$(cd "$HERE/../.." && pwd)"

if [[ -z "$TARGET" ]]; then
  echo "استفاده: $0 /path/to/danesh_book3096-final" >&2
  exit 1
fi

if [[ ! -f "$TARGET/package.json" ]] || ! grep -q '"next"' "$TARGET/package.json"; then
  echo "خطا: «$TARGET» یک مخزن Next.js به نظر نمی‌رسد (package.json با next پیدا نشد)." >&2
  exit 1
fi

TARGET="$(cd "$TARGET" && pwd)"
echo "→ کپی فایل‌ها در: $TARGET"
cp -R "$HERE/files/." "$TARGET/"
mkdir -p "$TARGET/public/games/bijan"

echo "→ ساخت بازی از: $GAME_ROOT"
cd "$GAME_ROOT"
if [[ ! -d node_modules ]]; then
  npm install --no-audit --no-fund
fi
npm run build

cp dist/index.html "$TARGET/public/games/bijan/index.html"

echo
echo "✅ آماده است. فایل بازی: public/games/bijan/index.html ($(du -h "$TARGET/public/games/bijan/index.html" | cut -f1))"
echo
echo "قدم بعدی:"
echo "  cd \"$TARGET\" && npm run typecheck && npm run lint && npm run dev"
echo "  سپس http://localhost:3000  (بنر بالای صفحه‌ی خانه) و http://localhost:3000/bijan"
