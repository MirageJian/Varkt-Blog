# Holacode_blog

[This is the server code](https://github.com/MirageJian/Holacode_blog_server)

it's an project currently developing.

## How to build

run `npm build` or `ng build --prod --build-optimizer` in console.


## Development mode running

run `npm start_proxy` or `ng serve --proxy-config proxy.conf.json --open` in console. Default port is `localhost:8888`

## Some important configuration

### About ngsw-config.json

navigationUrls defines which kinds of url will be accepted, so I use those url config to make apis work properly  
`
  "navigationUrls": [  
    "/**",  
    "!/**/*.*",  
    "!/**/*__*",  
    "!/**/*__*/**",  
    "!/api/**"
  ]
`

## Dependencies

Besides angular basic dependencies (npm, angular-cli, etc.).

* quill
* @angular/animations
* @angular/cdk
* @angular/material
* @angular/pwa
* @angular/service-worker
* hammerjs
* highlight.js
