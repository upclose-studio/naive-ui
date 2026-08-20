#!/usr/bin/env bash
set -euo pipefail

# The test suite and date-based components assume the UTC+8 timezone
# (CI runs `timedatectl set-timezone Asia/Shanghai` before tests). Without
# it, locale date snapshots render in UTC and fail.
if [ -e /usr/share/zoneinfo/Asia/Shanghai ]; then
  if command -v sudo >/dev/null 2>&1; then
    sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    echo 'Asia/Shanghai' | sudo tee /etc/timezone >/dev/null
  elif [ -w /etc/localtime ] || [ "$(id -u)" = "0" ]; then
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    echo 'Asia/Shanghai' >/etc/timezone
  fi
fi

# Ensure the pinned pnpm (from package.json "packageManager") is available.
corepack enable >/dev/null 2>&1 || true

# pnpm-lock.yaml is gitignored (no committed lockfile), so a plain install
# is used rather than --frozen-lockfile.
pnpm install
