FROM ruby:alpine3.12

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

RUN gem install ultrahook

CMD ultrahook --key ${API_KEY} webhook ${DEST}
