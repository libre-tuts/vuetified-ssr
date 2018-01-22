# Vuetified SSR

## Intro

This is a Laravel Starter App With Nuxt for Server Side Rendering and  Vuetify For Beautiful UI.

Lately After Experimenting With [Laravel SSR](https://github.com/exodusanto/laravel-ssr) and [Multi Page SSR with Laravel](https://vuejsdevelopers.com/2017/11/27/vue-js-laravel-server-side-rendering-router/)
Which I intergrate Both in Vuetified Starter App...

There Are Pros and Cons, Using PhpV8JS or Node on the Said Articles Above...

If You want Simple SSR and Want to use laravel for Rendering Then [Multi Page SSR with Laravel](https://vuejsdevelopers.com/2017/11/27/vue-js-laravel-server-side-rendering-router/) is you best Choice, The Good Thing About it is You Can Use Laravel To Return SEO for each page since it is a Multi Page APP...

Of Course You Can Use [Spatie/SSR](https://github.com/spatie/server-side-rendering) To Make this A Bit Easier For You To Integrate In You New Laravel App.

But if You Need Other Features Like Server Bundler, Streaming etc that Vue SSR is Offering Best You Try [Laravel SSR](https://github.com/exodusanto/laravel-ssr)
But the Cons here is You Need To Be Familiar with SSR pretty much to be able to set this up properly.

And Here Comes [Laravel Nuxt](https://github.com/cretueusebiu/laravel-nuxt)
Where We Can Use Laravel as API and Nuxt For Front End SSR. Well the Good thing here is We got Decouple Structure App and  We Can Use Nuxt to Boostrap All the Config We Need for SSR....

## Why I Created This

Sincerely I hate Boostrap Styling , 

And Instead of JWT for Authentication I wanna Use Laravel Passport, 

So In the Future if i Need To Use This For Desktop or Native App its Easy...

And I Want Real Time Ready Starter App Boilerplate

Which [Laravel SSR](https://github.com/exodusanto/laravel-ssr) is Lacking/Using... 

And I Love laravel, Vue Js and Vuetify... and Integrate New Technology in My Stacks

This Starter App Comes With Complete Auth Scafold Using Vuetify For the UI... 

A Simple Dashboard... And Profile Page To get You Started.

Hope You Enjoy It :)

## Requirements

- PHP 7.1+
- Composer
- NodeJs 8+
- Redis
- VS Code
- Laravel Valet or Docker or Homestead

## Installation

1. git clone https://github.com/codeitlikemiley/vuetified-nuxt
2. cd larave-nuxt
3. composer install
4. cp .env-example .env
5. php artisan key:generate
6. php artisan jwt:secret
7. edit .env 
8. npm install or yarn

## Usage

### Development

```bash
yarn dev or npm run dev
```

### Production with SSR

```bash
npm run build
npm run start
```

#### Nginx Proxy

For Nginx you can add a proxy using the follwing location block:

```
server {
    location / {
        proxy_pass http://HOST:PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Where `HOST` is the ip address of your server and `PORT` is the port you're running the application (3000 by default).

#### Process Manager

In production you need a process manager to keep the Node server alive forever:

```bash
# install pm2 process manager
npm install -g pm2

# startup script
pm2 startup

# start process
pm2 start npm --name "vuetified-nuxt" -- run start

# save process list
pm2 save

# list all processes
pm2 l
```

After each deploy you'll need to restart the process:

```bash
pm2 restart vuetified-nuxt 
```

### Production without SSR

If you don't want server side rendering you can use the [mode](https://nuxtjs.org/api/configuration-mode#the-mode-property) option:

- Uncomment `mode: 'spa'` and `'~plugins/nuxt-client-init'` in `client/nuxt.config.js` 
- Uncomment `// ->prefix('api')` in `app/Providers/RouteServiceProvider.php` 
- Set `APP_URL=http://example.com/api` and `CLIENT_URL=http://example.com` in your `.env`
- Run `npm run build`

Make sure to read the [Nuxt docs](https://nuxtjs.org/).

## Notes

- This project uses [router-module](https://github.com/nuxt-community/router-module), so you have to add the routes manually in `client/router.js`.
- If you want to separate this in two projects (client and server api), move `package.json` into `client/` and remove config path option from the scripts section. Also make sure to add the env variables in `client/.env`.

## Changelog

Please see [CHANGELOG](changelog.md) for more information what has changed recently.
