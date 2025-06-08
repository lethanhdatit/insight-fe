FROM node:22-alpine

WORKDIR /app

ARG INSIGHT_FE_PORT=6500
ENV INSIGHT_FE_PORT=${INSIGHT_FE_PORT}

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

RUN mv .next/standalone /standalone

RUN rm -rf .next app components lib node_modules public styles hooks package-lock.json package.json

RUN ls -la

RUN cd ./standalone && ls -la

CMD ["node", "/standalone/server.js", "--port", "${INSIGHT_FE_PORT}"]
