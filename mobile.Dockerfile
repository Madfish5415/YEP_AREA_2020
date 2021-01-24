FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION

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

ENV OPEN_JDK_VERSION="8"
ENV GLIBC_VERSION="2.32-r0"
ENV ANDROID_TOOLS_VERSION="6858069"

ENV ANDROID_SDK_ROOT="/opt/android-sdk-linux"

ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/bin"
ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/platform-tools"
ENV PATH="${PATH}:${ANDROID_SDK_ROOT}/tools"

RUN apk add --no-cache bash openjdk${OPEN_JDK_VERSION} unzip wget

RUN wget "https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub" -O /etc/apk/keys/sgerrand.rsa.pub
RUN wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk" -O glibc.apk
RUN wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk" -O glibc-bin.apk

RUN apk add --no-cache glibc.apk glibc-bin.apk

RUN rm glibc.apk glibc-bin.apk

RUN wget "https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_TOOLS_VERSION}_latest.zip" -O commandlinetools.zip

RUN unzip commandlinetools.zip -d "${ANDROID_SDK_ROOT}"

RUN rm commandlinetools.zip

RUN yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses

RUN yarn workspace area-mobile build:android


FROM base

COPY --from=build-android ${APP_DIRECTORY}/mobile/android/app/build/ ./mobile/android/app/build

CMD cp ./mobile/android/app/build/outputs/apk/release/app-release.apk $CLIENT_APK_PATH
