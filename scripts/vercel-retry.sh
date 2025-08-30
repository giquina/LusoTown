#!/usr/bin/env bash
set -euo pipefail

RETRIES="${1:-2}"
APP_DIR="${2:-.}"
SLEEP=10

# Validate retries is a number
if ! [[ "$RETRIES" =~ ^[0-9]+$ ]]; then
  echo "Error: RETRIES must be a positive integer, got: $RETRIES"
  exit 1
fi

cd "$APP_DIR"

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI not found; installing..."
  npm i -g vercel@latest
fi

echo "Retrying Vercel build/deploy up to $RETRIES times for transient errors..."
n=0
while [ $n -lt "$RETRIES" ]; do
  n=$((n+1))
  echo "Attempt $n of $RETRIES"
  set +e
  vercel build --prod --token "$VERCEL_TOKEN" | tee "vercel-build-retry-$n.log"
  status=$?
  set -e
  if [ $status -eq 0 ]; then
    url=$(vercel deploy --prebuilt --prod --token "$VERCEL_TOKEN")
    echo "Deployed successfully on retry $n: $url"
    echo "$url" > vercel-prod-url.txt
    exit 0
  fi
  echo "Build failed on retry $n, sleeping $SLEEP seconds..."
  sleep "$SLEEP"
  SLEEP=$((SLEEP*2))
done

echo "All retries failed."
exit 1