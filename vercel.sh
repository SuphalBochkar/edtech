#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ - Production environment detected. Proceeding with the build."
  exit 1
else
  echo "🔍 - Non-production environment detected. Checking for 'build' in the latest commit message..."

  if git log -1 --pretty=oneline --abbrev-commit | grep -w "build"; then
    echo "✅ - 'Build' found in the commit message. Proceeding with the build."
    exit 1
  else
    echo "🛑 - 'Build' not found in the commit message. Build cancelled."
    exit 0
  fi
fi
