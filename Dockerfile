FROM node:22-alpine

WORKDIR /app

ARG INSIGHT_FE_PORT=6500
ENV INSIGHT_FE_PORT=${INSIGHT_FE_PORT}

RUN mkdir temp

WORKDIR /app/temp

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN mkdir -p .next/standalone && cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

RUN mv .next/standalone/* /app

WORKDIR /app

RUN rm -rf temp

RUN ls -la

CMD ["node", "server.js", "--port", "${INSIGHT_FE_PORT}"]
