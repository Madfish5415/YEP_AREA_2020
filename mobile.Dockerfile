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

RUN apk add --no-cache build-base python3

COPY ./common ./common
COPY ./mobile ./mobile

RUN yarn install --pure-lockfile

RUN apk del build-base python3

RUN yarn global add expo-cli

RUN yarn build
RUN yarn workspace area-mobile build:export
RUN yarn workspace area-mobile build:serve &


FROM build as build-android

#ENV GLIBC_VERSION="2.32-r0"

#RUN wget "https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub" -O /etc/apk/keys/sgerrand.rsa.pub
#RUN wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk" -O glibc.apk
#RUN wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk" -O glibc-bin.apk

#RUN apk add --no-cache glibc.apk glibc-bin.apk

#RUN rm glibc.apk glibc-bin.apk

ENV OPEN_JDK_VERSION=8

RUN apk add --no-cache bash openjdk${OPEN_JDK_VERSION}

#RUN yarn workspace area-mobile build:android
