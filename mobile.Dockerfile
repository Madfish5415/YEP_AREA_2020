FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION
ARG PLATFORM_TARGET="android"

LABEL eu.epitech.image.created="${IMAGE_CREATION}"
LABEL eu.epitech.image.authors="EPITECH <project@epitech.eu>"
LABEL eu.epitech.image.url="https://github.com/MrSquaare/YEP_AREA_2020/server/README.md"
LABEL eu.epitech.image.source="https://github.com/MrSquaare/YEP_AREA_2020/server"
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


FROM build AS build-android

ENV OPEN_JDK_VERSION=8
ENV ANDROID_TOOLS_VERSION=6858069

RUN wget https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub -O /etc/apk/keys/sgerrand.rsa.pub
RUN echo https://apkproxy.herokuapp.com/sgerrand/alpine-pkg-glibc >> /etc/apk/repositories

RUN apk add --no-cache glibc glibc-bin openjdk${OPEN_JDK_VERSION}

ENV ANDROID_SDK_ROOT="/opt/android-sdk-linux"
ENV ANDROID_HOME=${ANDROID_SDK_ROOT}

ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/bin:${ANDROID_SDK_ROOT}/tools:${ANDROID_SDK_ROOT}/platform-tools"

RUN wget "https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_TOOLS_VERSION}_latest.zip" -O "commandlinetools.zip"

RUN mkdir -p ${ANDROID_SDK_ROOT} \
 && unzip "commandlinetools.zip" -d "${ANDROID_SDK_ROOT}" \
 && rm "commandlinetools.zip"

RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses

RUN yarn workspace area-mobile sync:android
RUN yarn workspace area-mobile build:android


FROM base

COPY --from=build-android ${APP_DIRECTORY}/common ./common
COPY --from=build-android ${APP_DIRECTORY}/mobile ./mobile
