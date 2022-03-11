#!/usr/bin/env bash

pages=(
""
"buy"
"buyout-no-discount-offer"
"contract-offer-booking"
"contract-offer-legal"
"contract-offer-microservices"
"contract-offer-selection"
"contract-offer-subscription"
"contract-offer-warranty"
"cookies-policy"
"exchange"
"exchange-max"
"guarantee-primary"
"guarantee-secondary"
"june-discount"
"main-sale"
"mortgage-promotion"
"payment"
"personal-data"
"privacy-policy"
"sale"
"terms-of-use"
)

for page in "${pages[@]}"; do
  url="$BASE_URL"/"$page"
  echo Fetching page "$url"
  curl -s "$url" -o /dev/null
done
