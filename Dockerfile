FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /situs
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build

