# Welcome to an undeveloped blog

Version: 0.0.0

it's an project currently under heavily developing. [Online Demo](https://varkt.com)

This is the [Test Spacce](https://github.com/MirageJian/web-camera-for-angular) for Angula.
## Using introduction

After preparing database, the server will use seeds to create default admin account.

The default usename is `admin`. The default password is `123456`.

There is no multi-users plan for this blog. But the password can be change in admin dashboard. Will consider adding user modification function.

## File description

`database_structure.sql` is the database script.  
`varkt.conf` is nginx conf file. It contains gzip config, https config and url handle.

# Varkt web client

[Go Back](https://github.com/MirageJian/varkt)
## How to build
run `npm build` in console.

The detail of parameters for build is in package.json

## Development mode running
run `npm start` or `ng serve --proxy-config proxy.conf.json --open` in console.
Default port is `localhost:8888`. Default language is English.

If you want run it of other language, you can find the command in the package.json file.
For example `npm start:zh` will run in Chinese language.

## Some important configurations
### i18n config
Detail description is on [here](https://angular.io/guide/i18n)

`src/locle` store the translation files, just including English and Chinese.

The language displayed depends on the url visited.
So there is `"baseHref": "/zh"` in the angular.json file.

In order to build multi language apps, it has to config multi configurations in angular.json file.
Such as `"production-zh": {}`

### Proxy config
When in the development mode, use `--proxy-config proxy.conf.json` parameter to start. (Deprecated)

In `proxy.conf.json`, I define the port and how to rewrite the url like anti-proxy \(nginx\).

**New way of using proxy file**: Proxy can be configured in `angular.json` file. Please see `...architect.serve.options.proxyConfig: 'proxy.conf.json'`

```json
{
  "/api": {
    "target": "http://localhost:8888",
    "secure": "false",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### About ngsw-config.json
navigationUrls defines which kinds of url will be accepted, so I use those url config to make apis work properly
```json
{
  "navigationUrls": [  
    "/**",  
    "!/**/*.*",  
    "!/**/*__*",  
    "!/**/*__*/**",  
    "!/api/**"
  ]
}
```

## Dependencies
Besides angular basic dependencies (angular/common, angular/router, angular-cli, etc.).

`core-js`  
`@angular/animations`  
`@angular/cdk`  
`@angular/material`  
`@angular/pwa`  
`@angular/service-worker`  
 The package below need types to work better (or just use with api hint :D )   
`ngx-markdown`   
`hammerjs`  

# Varkt server

[Go Back](https://github.com/MirageJian/varkt)

This is server code for varkt.com.

## How to run

Use sql file to create database. Then run `python server.py`.

## Pip dependencies

* tornado
* pymysql

## Error code illustration
`0` - Everything ok  
`1`, `-1`, `2`, `3` etc. - Something wrong, see the error detail in `errmsg`.

