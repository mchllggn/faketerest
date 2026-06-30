FROM php:8.3-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libzip-dev \
    libpq-dev

RUN docker-php-ext-install pdo_pgsql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

EXPOSE 9000

CMD ["php-fpm"]