FROM node:12.18.2 as build
WORKDIR /src
COPY . .
RUN npm i
RUN npm run build