FROM node:23-alpine3.19 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV DOCKER_ENV=true
RUN npm run build

FROM nginx:alpine3.20
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]