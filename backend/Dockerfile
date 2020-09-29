FROM node as BUILD

COPY . /source
COPY docker/tds /source/src/tds

WORKDIR /source
RUN npm install && npm run build

FROM node:10.22.1-alpine3.10
RUN npm i @node-wot/cli@0.7.1 -g
COPY --from=BUILD /dist/backend /app
COPY --from=BUILD /source/docker.servient.config.json /app/servient.config.json
WORKDIR /app
CMD wot-servient -f servient.config.json bundle.js