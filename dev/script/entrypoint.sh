#!/bin/bash

/usr/local/bin/docker-php-entrypoint

if test -e /entry/first-run; then
    composer install
    composer update

    /entry/wait-for-it.sh db:3306 -t 45
    php /var/www/artisan config:cache
    php /var/www/artisan key:generate
    php /var/www/artisan migrate
    rm -rf /entry/first-run
fi

chown -R :www-data /var/www/app
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

exec "$@"

