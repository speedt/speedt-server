/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils'),
	path = require('path'),
	fs = require('fs');

var Constants = require('./constants');

var exp = module.exports;

exp.defaultConfiguration = function(app){
	var args = parseArgs(process.argv);
	setupEnv(app, args);
	processArgs(app, args);
	configLogger(app);
	loadLifecycle(app);
};

var setupEnv = function(app, args){
	app.set(Constants.RESERVED.ENV, args.env || process.env.NODE_ENV || Constants.RESERVED.ENV_DEV, true);
};

var processArgs = function(app, args){
	if(!args.id) throw new Error('id is null');
	if(!args.serverType) throw new Error('serverType is null');
	if(!args.host) throw new Error('host is null');
	if(!args.port) throw new Error('port is null');
	app.set(Constants.RESERVED.SERVER_TYPE, args.serverType, true);
	app.set(Constants.RESERVED.SERVER_ID, args.id, true);
	app.set(Constants.RESERVED.CURRENT_SERVER, args, true);
};

var configLogger = function(){
	// TODO
};

var loadLifecycle = function(){
	// TODO
};

var parseArgs = function(args){
	var mainPos = 1;

	var argsMap = {
		main: args[mainPos]
	};

	for(var i = ++mainPos, j = args.length; i < j; i++){
		var arg = args[i];
		var sep = arg.indexOf('=');
		if(-1 === sep) continue;

		var key = arg.slice(0, sep);
		if(!key) continue;

		var value = arg.slice(++sep);
		if(!value) continue;

		if(!isNaN(Number(value)) && 0 > (value.indexOf('.'))){
			value = Number(value);
		}

		argsMap[key] = value;
	}

	console.log('[%s] app args: %j.', utils.format(), argsMap);
	return argsMap;
};