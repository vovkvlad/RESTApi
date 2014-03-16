/**
 * Created with JetBrains WebStorm.
 * User: Vlad
 * Date: 16.01.14
 * Time: 1:45
 * To change this template use File | Settings | File Templates.
 */


//var SQLexecuter = require('./SQLlogic');
//var express = require('express');
var ProjectConfig = require('./Config');
var pressa = require('./pressa');

pressa.app.listen(ProjectConfig.serverConfig.port);