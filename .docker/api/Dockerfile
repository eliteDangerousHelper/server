# étape de développement
FROM node:lts-alpine as development
WORKDIR /application

CMD ["yarn", "api-dev"]

# étape de build
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn api-build

# étape de production
FROM alpine as production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build-stage /app/bin /app/bin
COPY --from=build-stage /app/package*.json /app
RUN yarn install

CMD ["yarn", "api-start"]
