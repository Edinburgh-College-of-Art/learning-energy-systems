Build the docker image from scratch:

docker build -t eca/admin-app-image .

Build and run latest mysql container:

docker run -d --name admin-mysql -e MYSQL_ROOT_PASSWORD=change_me_too \
 -e MYSQL_DATABASE=wwwlearn_school \
 -e MYSQL_USER=wwwlearningenerg \
 -e MYSQL_PASSWORD=change_me mysql:latest

docker run -d -p 80:80 --name admin-app \
  -e "DATABASE_URL=mysql://root:change_me_too@admin-mysql/wwwlearn_school?encoding=utf8&timezone=UTC&cacheMetadata=true" \
  -e "SESSION_DEFAULTS=database" --link admin-mysql:mysql eca/admin-app-image

To attach bash: 

docker exec -it <container name> bash

To run an .sql import on db container:

docker exec -i admin-mysql mysql -uwwwlearningenerg -pchange_me wwwlearn_school < original-db-dump.sql

To stop containers: 

docker stop <container name>

Inspecting db in admin-mysql container:

docker exec -it admin-mysql bash
mysql -u wwwlearningenerg --password=change_me
use wwwlearn_school;
show tables;