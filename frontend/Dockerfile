FROM node:20.10-alpine as build
WORKDIR /app
COPY package* .
RUN npm ci
COPY . .
RUN npm run build
CMD cp -r build result_build
