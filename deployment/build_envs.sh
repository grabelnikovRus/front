#!/usr/bin/env sh

ENV_FILE_NEXT=.env.production.local

echo "Building ${ENV_FILE_NEXT} file"
echo "NEXT_PUBLIC_YMAPS_APIKEY=${YMAPS_APIKEY}" > "${ENV_FILE_NEXT}"
echo "NEXT_PUBLIC_SEGMENTSTREAM_APIKEY=${SEGMENTSTREAM_APIKEY}" >> "${ENV_FILE_NEXT}"
echo "NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY=${GOOGLE_CAPTCHA_KEY}" >> "${ENV_FILE_NEXT}"
echo "SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}" >> "${ENV_FILE_NEXT}"
echo ""
echo "${ENV_FILE_NEXT}"
cat "${ENV_FILE_NEXT}"
