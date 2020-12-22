FROM node:lts-alpine AS builder
WORKDIR /situs
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .
RUN npm run build

FROM alpine
WORKDIR /situs
COPY --from=builder /situs/dist ./

