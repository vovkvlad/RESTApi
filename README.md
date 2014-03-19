RESTApi
=======

Config.js is excluded as it contain personal data, specific for each project, howeever it`s used in source code
files. So before using it, create this file in the same directory, with next code:

````
var dbConfig = {
    host: 'your host',
    user: 'your user',
    password: 'Password of your user',
    database: 'db you gonna use',
    debug: 'true'
 };
 var serverConfig ={
    port : 8333
 };

 exports.dbConfig = dbConfig;
 exports.serverConfig = serverConfig;
 ````
