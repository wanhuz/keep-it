<p align="left">
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

![image](https://github.com/wanhuz/keep-it/assets/12682216/eba3a91c-4038-49cd-9f11-2704f7a9c972)

![image](https://github.com/wanhuz/keep-it/assets/12682216/7d2a4b3a-f664-4a40-9e30-e42bf4e83da4)



## Keep-It

Keep-it is a sticky note taking web application inspired by services such as Google Keep. It allows user to post sticky note and organize the note using tags. Keep-it is current a work in progress, and as such is not recommended to be use in daily life. 

## Current features

Keep-it is current a work in progress project. It starts as a hobby project to learn web development with the intentions to become a replacement for Google Keep.

- Post note
- Tag and filter note
- Search through note
- Edit and remove tag
- User customization such as background image or interface color

## Setup
Setup can be done with Docker-compose

Create a environment files from env.example, then bind the ENV file using docker

### Running with Docker Compose (Recommended)
To run the application using Docker Compose, use the following YAML configuration:

```yml
version: "3.7"
services:
  app:
    image: wanhuz/keepit:latest
    container_name: keepit-app
    restart: unless-stopped
    volumes:
      - /path/to/config:/usr/src/app/config
    links:
      - db
    networks:
      - keepit

  db:
    image: mysql:5.7
    container_name: keepit-db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: keepit-db
      MYSQL_ROOT_PASSWORD: keepit-test
      MYSQL_PASSWORD: keepit-test
      MYSQL_USER: keepit-user
      SERVICE_TAGS: dev
      SERVICE_NAME: mysql
    networks:
      - keepit

  nginx:
    image: nginx:alpine
    container_name: keepit-nginx
    restart: unless-stopped
    ports:
      - 8000:80
    links:
      - app
    depends_on:
      - app
    networks:
      - keepit

networks:
  keepit:
    driver: bridge
```

Change /path/to/config to your env location

## Upcoming feature
- Embed image and video in note

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
