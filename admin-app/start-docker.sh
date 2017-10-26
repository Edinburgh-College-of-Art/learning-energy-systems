#!/bin/bash

echo "Removing existing containers"

docker stop admin-mysql
docker stop admin-app

docker rm admin-mysql
docker rm admin-app

echo "Removing unused volumes"

docker volume prune -f

echo "Rebuilding image"

docker build -t eca/admin-app-image .

docker run -d --name admin-mysql -e MYSQL_ROOT_PASSWORD=change_me_too \
 -e MYSQL_DATABASE=wwwlearn_school \
 -e MYSQL_USER=wwwlearningenerg \
 -e MYSQL_PASSWORD=change_me mysql:latest

echo "Runnning app container"

docker run -d -p 80:80 --name admin-app \
  -e "DATABASE_URL=mysql://root:change_me_too@admin-mysql/wwwlearn_school?encoding=utf8&timezone=UTC&cacheMetadata=true" \
  -e "SESSION_DEFAULTS=database" \
  --mount type=bind,source="$(pwd)"/src,target=/var/www/html/src \
  --link admin-mysql:mysql eca/admin-app-image

echo "Waiting on container to be ready."
sleep 20s

echo "Creating tables from .sql file"
docker exec -i admin-mysql mysql -uwwwlearningenerg -pchange_me wwwlearn_school < original-db-dump.sql

echo "Done. Visit http://localhost/ to view app"
