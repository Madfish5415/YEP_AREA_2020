FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION
ARG PLATFORM_TARGET="android"

LABEL eu.epitech.image.created="${IMAGE_CREATION}"
LABEL eu.epitech.image.authors="EPITECH <project@epitech.eu>"
LABEL eu.epitech.image.url="https://github.com/MrSquaare/YEP_AREA_2020/mobile/README.md"
LABEL eu.epitech.image.source="https://github.com/MrSquaare/YEP_AREA_2020/mobile"
LABEL eu.epitech.image.version="${IMAGE_VERSION}"
LABEL eu.epitech.image.vendor="Epitech"
LABEL eu.epitech.image.licenses="MIT"
LABEL eu.epitech.image.title="AREA"
LABEL eu.epitech.image.description="Automation platform of his digital life"

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY lerna.json package.json tsconfig.json yarn.lock ./


FROM base AS build

COPY ./common ./common
COPY ./mobile ./mobile

RUN yarn install --pure-lockfile

RUN yarn build

FROM build as build-android

ENV OPEN_JDK_VERSION=8

RUN apk add --no-cache bash openjdk${OPEN_JDK_VERSION}

COPY ./scripts/mobile ./scripts/mobile

RUN ./scripts/mobile/install-alpine-glibc.sh
RUN ./scripts/mobile/install-alpine-android-tools.sh

ENV ANDROID_SDK_ROOT="/opt/android-sdk-linux"
ENV ANDROID_HOME=${ANDROID_SDK_ROOT}

ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/bin"
ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/platform-tools"
ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/tools"

RUN yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses

RUN yarn workspace area-mobile build:android
