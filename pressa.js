/**
 * Created by Vlad on 16.03.14.
 */

var mysql = require('mysql');
var ProjectConfig = require('./Config');
var express = require('express');
/*Config.js must be in the same directory, and should have next code:
*var dbConfig = {
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
 */
var pool = mysql.createPool(ProjectConfig.dbConfig);
var app = express();
app.use(express.json());


app.get('/',function(req, res){
    pool.getConnection(function(err, connection){
        if(err){
            console.log('Something gone wrong with connections. Details:' + err.code);
            res.status(504);
        }
        else
        {
            connection.query('SELECT * FROM news', function(err, rows){
                if(err){
                    console.log('Something wrong with query. Details:' + err.code);
                    res.status(504);
                }
                else{
                    res.send(JSON.stringify(rows));
                }
            });

            connection.release();
        }
    });
});
//TODO improve logic in defining id
app.get('/[0-9]*$',function(req, res){
    pool.getConnection(function(err, connection){
        if(err){
            console.log('Something gone wrong with connections. Details:' + err.code);
            res.status(504);
        }
        else
        {
            var id = req.url.slice(1);
            connection.query('SELECT * FROM news WHERE nid=' + connection.escape(id), function(err, rows){
                if(err){
                    console.log('Something wrong with query. Details:' + err.code);
                    res.status(504);
                }
                else{
                    res.send(JSON.stringify(rows));
                }
            });

            connection.release();
        }
    });
});

app.post('/', function(req, res){
    pool.getConnection(function(err, connection){
        if(err){
            console.log('Something gone wrong with connections. Details:'+ err.code);
            res.status(504);
        }
        else{
            var queryvalues = [topic, title, content, date, archive].map(function(key){
                return connection.escape(req.body[key]);
            }).join("','");
            connection.query("INSERT INTO news (topic, title, content, date, archive) VALUES('"+ queryvalues +"')", function(err, result){
                if(err){
                    console.log('Something wrong with INSERT. Details:' + err.code);
                    res.status(504);
                }
                else console.log('transaction was successful, your id:' + result.insertId);

            });
        }
    });
});

exports.app = app;

