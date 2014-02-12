/**
 * Created with JetBrains WebStorm.
 * User: Vlad
 * Date: 16.01.14
 * Time: 1:45
 * To change this template use File | Settings | File Templates.
 */


var SQLexecuter = require('./SQLlogic');
var express = require('express');

var app = express();
app.use(express.json());


app.get('/', function(req, res){
    var query_result = SQLexecuter.SelectAll();
    res.send(JSON.stringify(query_result));
    console.log(JSON.stringify(query_result));
}) ;

app.get('/[0-9]*$', function(req, res){
    var id = "" ;
    for (var i = 1; i<req.url.length; i++)
    {
        id += req.url[i];
    }
    var query_result = SQLexecuter.SelectSingleItem(id);
    res.send(JSON.stringify(query_result));
    console.log(JSON.stringify(query_result));
});

app.post('/', function(req, res) {
    var resultObj = {
        topic: req.body.topic,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        archive: req.body.archive
    }
    SQLexecuter.InsertQuery(resultObj);
});

app.listen(8333);
