ARG NGINX_VERSION=1.21.4
ARG DOCKER_MIRROR=mirror-hub.pik-broker.ru/

FROM ${DOCKER_MIRROR}nginx:${NGINX_VERSION}-alpine
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY localhost.crt /etc/nginx/cert/localhost.crt
COPY localhost.key /etc/nginx/cert/localhost.key

WORKDIR /var/www

EXPOSE 80
