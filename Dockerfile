FROM node:22-alpine

WORKDIR /app

ARG INSIGHT_FE_PORT=6500
ENV INSIGHT_FE_PORT=${INSIGHT_FE_PORT}

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

RUN mv .next/standalone /app/standalone

RUN rm -rf /app/* && mv /app/standalone /app/standalone

CMD ["node", "/app/standalone/server.js", "--port", "${INSIGHT_FE_PORT}"]
