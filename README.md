RESTApi
=======
````
Config.js must be in the same directory, and should have next code:
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
