# This Dockerfile is the recommended file fron Next.js official documentation
# https://nextjs.org/docs/deployment#docker-image

ARG NODE_VERSION=16.13.0
ARG ALPINE_VERSION=3.14
ARG YARN_VERSION=1.22.15
ARG DOCKER_MIRROR=mirror-hub.pik-broker.ru/
ARG NODE_IMAGE=${DOCKER_MIRROR}node:${NODE_VERSION}-alpine${ALPINE_VERSION}

FROM ${NODE_IMAGE} AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat && yarn set version ${YARN_VERSION}
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Lint the source code
FROM deps AS linter
WORKDIR /app

COPY . .

# Build the source code
FROM linter AS builder

RUN yarn build --debug && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js /app/.env /app/.env*.local ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
