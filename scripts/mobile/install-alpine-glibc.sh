#!/usr/bin/env sh

GLIBC_VERSION="2.32-r0"

wget "https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub" -O /etc/apk/keys/sgerrand.rsa.pub
wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk" -O glibc.apk
wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk" -O glibc-bin.apk

apk add --no-cache glibc.apk glibc-bin.apk

rm glibc.apk glibc-bin.apk
