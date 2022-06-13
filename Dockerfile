FROM node:12 AS builder
WORKDIR /app

WORKDIR /app/memento.pwa
COPY /memento.pwa/package*.json ./
COPY /memento.pwa/patches ./patches
RUN npm ci && npx patch-package

WORKDIR /app/memento.server
COPY /memento.server/package*.json ./
RUN npm ci

WORKDIR /app/memento.pwa
COPY /memento.pwa ./
ARG DOCKER_ENV
ENV NODE_ENV=${DOCKER_ENV}
RUN npm run build:${DOCKER_ENV}
RUN cp -R ./build ../memento.server/build

WORKDIR /app/memento.server
COPY /memento.server ./
EXPOSE 3006
CMD npm start