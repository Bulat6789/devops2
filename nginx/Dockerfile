FROM nginx:1.27-alpine

COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY ssl/server.crt /etc/nginx/ssl/server.crt
COPY ssl/server.key /etc/nginx/ssl/server.key

RUN chmod 600 /etc/nginx/ssl/server.key

EXPOSE 8443
