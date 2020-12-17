# étape de développement
FROM node:lts-alpine as development
WORKDIR /application

CMD ["yarn", "dev"]

# étape de build
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# étape de production
FROM alpine as production
ENV NODE_ENV=production
COPY --from=build-stage /app/bin /app/bin
COPY --from=build-stage /app/package*.json /app
RUN yarn install

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
