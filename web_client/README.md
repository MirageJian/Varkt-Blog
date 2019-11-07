# Holacode_blog
[This is the server code](https://github.com/MirageJian/Holacode_blog_server)
it's an project currently developing.
## How to build
run `npm build` in console.  
The detail of parameters for build is in package.json  
## Development mode running
run `npm start` or `ng serve --proxy-config proxy.conf.json --open` in console. Default port is `localhost:8888`. Default language is English.  
If you want run it of other language, you can find the command in the package.json file. For example `npm start:zh` will run in Chinese language.
## Some important configurations
### i18n config
Detail description is on [here](https://angular.io/guide/i18n)  
`src/locle` store the translation files, just including English and Chinese.  
The language displayed depends on the url visited. So there is `"baseHref": "/zh"` in the angular.json file.  
In order to build multi language apps, it has to config multi configurations in angular.json file. Such as `"production-zh": {}`  
### Proxy config
When in the development mode, use `--proxy-config proxy.conf.json` parameter to start.  
In `proxy.conf.json`, I define the port and how to rewrite the url like anti-proxy \(nginx\).
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
