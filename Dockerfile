# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG VUE_APP_BACKEND_BASE_URL
ARG VUE_APP_KEYCLOAK_CLIENT_ID
ARG VUE_APP_KEYCLOAK_REALM
ARG VUE_APP_KEYCLOAK_URL
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx/ /etc/nginx/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]