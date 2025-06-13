FROM node:22-alpine

WORKDIR /app

ARG INSIGHT_FE_PORT=6500
ENV INSIGHT_FE_PORT=${INSIGHT_FE_PORT:-6500}
ENV PORT=${INSIGHT_FE_PORT}

EXPOSE ${INSIGHT_FE_PORT}

RUN mkdir temp

WORKDIR /app/temp

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN ls -la

RUN npm run build

RUN mkdir -p .next/standalone \
    && cp -r public .next/standalone/ \
    && cp -r .next/static .next/standalone/.next/ \
    && cp .env .next/standalone/ \
    && cp .env .next/standalone/.next/

RUN cp -r .next/standalone/. /app

WORKDIR /app

RUN rm -rf temp

RUN ls -la

RUN ls -la ./.next

RUN npm install pm2 -g

CMD ["pm2", "start", "server.js", "--name", "insight-fe", "--watch", "--no-daemon"]
