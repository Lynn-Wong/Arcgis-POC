FROM node:20-alpine AS build-stage
WORKDIR /app
RUN npm install -g @angular/cli@18.2.1 --registry=https://registry.npmmirror.com

COPY package.json package-lock.json ./
COPY patches ./patches/

RUN rm -rf node_modules \
    && rm -rf dist \
    && rm -rf .angular \
    && npm ci

COPY . .

RUN npm install --registry=https://registry.npmmirror.com  --legacy-peer-deps
RUN rm -rf dist .angular node_modules/.cache \
    && npm run build:prod
RUN ls -la /app/dist

FROM registry.chengdu.local/osp/nginx:1.21.4 AS production-stage
RUN rm -f /etc/nginx/nginx.conf && \
    rm -rf /etc/nginx/conf.d/*  && \
    rm -f /etc/nginx/variables.conf  && \
    rm -f /etc/nginx/variables.conf:1

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
