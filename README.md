# Welcome to an undeveloped blog

it's an project currently under heavily developing.

## Web client

[click go to client code](./web_client/README.md)  
Based on Angular as front-end.

## Server

[This is the server code](./server/README.md)  
Based on Tornado as back-end.
It uses MySQL databse

## Using introduction

After preparing database, the server will use seed to create basic admin account.

The default usename is `admin`, the default password is `123456`.

There is no multi-user plan for this blog. But the password can be change in admin dashboard. Will consider adding user modification function.

## File description

`database_structure.sql` is the database script.  
`holacodes.conf` is nginx conf file. It contains gzip config, https config and url handle.
