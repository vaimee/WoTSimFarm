FROM node as BUILD

COPY . /source
ARG BACKEND_ADD=http://localhost:8000/
WORKDIR /source
RUN npm install && npm run build -- --mode production

FROM nginx:1.19.2-alpine
COPY --from=BUILD /dist/frontend /usr/share/nginx/html
COPY --from=BUILD /source/assets /usr/share/nginx/html/assets