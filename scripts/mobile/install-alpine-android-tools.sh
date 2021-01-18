#!/usr/bin/env sh

ANDROID_SDK_ROOT="/opt/android-sdk-linux"
ANDROID_TOOLS_VERSION="6858069"

wget "https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_TOOLS_VERSION}_latest.zip" -O commandlinetools.zip

mkdir -p "${ANDROID_SDK_ROOT}"
unzip commandlinetools.zip -d "${ANDROID_SDK_ROOT}"

rm commandlinetools.zip
