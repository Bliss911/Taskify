## Steps to reproducun
- <b>clone repository</b>
- run <b>composer install</b>
- run <b>cp .env.example .env</b> to populate env file with default values. Skip if initial setup is already done.
- <b>fill the required env values</b> id DB_ and JWT_ values, then create database
- run <b>php artisan key:generate</b> to generate app key
- run <b>php artisan migrate --seed</b>
- run <b>php artisan jwt:secret</b>
- run <b>php artisan serve</b>
- run <b>php artisan websockets:serve</b> in another terminal(same dir)
- run <b>yarn && yarn run watch</b> in another terminal(same dir)

You can now view the project @localhost:8000.
Websockets dashboard is available @localhost:8000/laravel-websockets
