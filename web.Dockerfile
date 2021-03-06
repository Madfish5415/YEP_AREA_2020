FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION

LABEL eu.epitech.image.created="${IMAGE_CREATION}"
LABEL eu.epitech.image.authors="EPITECH <project@epitech.eu>"
LABEL eu.epitech.image.url="https://github.com/MrSquaare/YEP_AREA_2020/web/README.md"
LABEL eu.epitech.image.source="https://github.com/MrSquaare/YEP_AREA_2020/web"
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

COPY ./common/blocs ./common/blocs
COPY ./common/styles ./common/styles
COPY ./common/types ./common/types
COPY ./web ./web

RUN yarn install --pure-lockfile

RUN yarn build


FROM base

COPY --from=build ${APP_DIRECTORY}/common ./common
COPY --from=build ${APP_DIRECTORY}/web ./web

RUN yarn install --production --pure-lockfile

RUN yarn cache clean --all

RUN rm -rf ./common/**/src
RUN rm -rf ./web/src

CMD yarn start:web
