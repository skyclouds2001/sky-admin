FROM node:latest as compile

WORKDIR /app

RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:latest as serve

COPY serve/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=compile /app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
