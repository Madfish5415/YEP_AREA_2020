# YEP_AREA_2020

Automation platform of his digital life

## About

The project is divided into three main packages:

- [Server](server): the application server
- [Mobile](mobile): a mobile client
- [Web](web): a web client

In addition, several packages common to all three projects are shared and available in [Common](common).

### Tools

Code quality:
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io)

Mono-repository:
- [Lerna](https://lerna.js.org/)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

## Getting started

### Docker

#### Prerequisites

1. [Install Docker](https://docs.docker.com/get-docker/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)

### Yarn

#### Prerequisites

1. [Install Yarn](https://classic.yarnpkg.com/en/docs/install)

#### Installation

1. Install dependencies

```shell
yarn install
```

iOS only:
```shell
(cd mobile/ios/ && pod install)
```

2. Build the packages

```shell
yarn build
```

## Using

### Docker

#### Server & Web

1. Start Docker Compose

```shell
docker-compose up
```

### Yarn

#### Server & Web

1. Start the server

```shell
yarn start:server
```

2. Start the web client

```shell
yarn start:web
```

#### Mobile

**Android**:

```shell
yarn build:android
```

**iOS**:

>:warning: **First time ?**  
> Before executing the command, you'll need to launch the AREA project (mobile/ios/AREA.xcodeproj) in Xcode and do the request changes:
> - Set a development team in the AREA project.
> - Change the Bundle Identifier to a unique one.  
```shell
yarn build:ios
```
