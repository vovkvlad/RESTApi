/**
 * Created with JetBrains WebStorm.
 * User: Vlad
 * Date: 15.01.14
 * Time: 16:20
 * To change this template use File | Settings | File Templates.
 */

/* File contains all needed function to interact with SQL*/

var mysql = require('mysql');
var SqlConectionOpts = {
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'pressa',
    debug: 'true'
};
var connection;
function HandleConnection()
{
    connection = mysql.createConnection(SqlConectionOpts) ;
}
function Connect()
{
    connection.connect(function(err){
        if(err)
        {
            console.log('Something`s gone wrong during connection to MySQL look for details:' + err.code);
            setTimeout(HandleConnection, 2000);
        }
    });
}
function SelectAll()
{
    Connect();
    var querymessage = 'SELECT * FROM news_umz';
    connection.query('USE pressa');
    connection.query(querymessage, function(err,rows){
        if(err)
        {
            console.log('Something wrong with a query. Details: ' + err.code);
        }
        else
        {
            console.log(rows);
            return rows;
        }
    })
    connection.end();
}
function SelectSingleItem(nid)
{
    Connect();
    var querymessage = 'SELECT * FROM news_umz WHERE nid=' + connection.escape(nid);
    connection.query('USE pressa');
    connection.query(querymessage, function(err, rows){
        if(err)
        {
            console.log('Somethig gone wrong with retrieving singleitem. Details: ' + err.code);
        }
        else
        {
            console.log(rows);
            return rows;
        }
    });
    connection.end();
}

function InsertQuery(obj)
{
    Connect();
    var querymessage = "INSERT INTO news (topic, title, content, date, archive) VALUES('" +connection.escape(obj.topic) + "','" + connection.escape(obj.title) + "','" +
        connection.escape(obj.content) + "','" + connection.escape(obj.date) + "','" + connection.escape(obj.archive) + "')";
    connection.query('USE pressa');
    connection.query(querymessage, function(err, rows){
        if (err)
        {
            console.log('Something gone wrong with INSERT. Details: ' + err.code);
        }

    })
}
HandleConnection();
SelectAll();

exports.SelectAll = SelectAll;
exports.SelectSingleItem = SelectSingleItem;
exports.InsertQuery = InsertQuery;


exports.MakeQuery = MakeQuery;



