
# Welcome to an undeveloped blog

Version: 0.0.0

it's an project currently under heavily developing. [Online Demo](https://holacodes.com)

This is the [Test Spacce](https://github.com/MirageJian/web-camera-for-angular) for Angula.

## Web client

[Click go to client code](./web_client/README.md)  
Based on Angular as front-end.

## Server

[Click go to server code](./server/README.md)  
Based on Tornado as back-end.
It uses MySQL databse

## Using introduction

After preparing database, the server will use seeds to create default admin account.

The default usename is `admin`. The default password is `123456`.

There is no multi-users plan for this blog. But the password can be change in admin dashboard. Will consider adding user modification function.

## File description

`database_structure.sql` is the database script.  
`holacodes.conf` is nginx conf file. It contains gzip config, https config and url handle.
