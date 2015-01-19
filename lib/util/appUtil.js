/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils'),
	path = require('path'),
	async = require('async'),
	fs = require('fs');

var Constants = require('./constants');

var exp = module.exports;

exp.defaultConfiguration = function(app){
	var args = parseArgs(process.argv);
	setupEnv(app, args);
	loadConfig(app, args);
	processArgs(app, args);
	configLogger(app);
	loadLifecycle(app);
};

exp.optComponents = function(comps, method, cb){
	async.forEachSeries(comps, function (comp, done){
		if('function' === typeof comp[method]){
			comp[method](done);
			return;
		}
		done();
	}, function (err){
		if(err){
			console.error('[%s] operate component fail, method: %j, err: %j.', utils.format(), method, err);
		}
		utils.invokeCallback(cb, err);
	})
};

exp.loadDefaultComponents = function(app){
	var speedt = require('../');
	app.load(speedt.component.connector, app.get('connectorConfig'));
	app.load(speedt.component.monitor, app.get('monitorConfig'));
};

exp.startByType = function(app, cb){
	utils.invokeCallback(cb);
};

var loadConfig = function(app, args){
	if(args.file){
		var originPath = path.join(app.getBase(), args.file);
		if(fs.existsSync(originPath)){
			var file = require(originPath);
			file = file[app.get(Constants.RESERVED.ENV)];
			for(var i in file){
				if(!args[i]) args[i] = file[i];
			}
		}
	}
	console.log('[INFO ] [%s] app args:'.green, utils.format());
	console.log(args);
};

var setupEnv = function(app, args){
	app.set(Constants.RESERVED.ENV, args.env || process.env.NODE_ENV || Constants.RESERVED.ENV_DEV, true);
};

var processArgs = function(app, args){
	if(!args.id) throw new Error('The server id cannot be null.');
	if(!args.serverType) throw new Error('The server type cannot be null.');
	if(!args.host) throw new Error('The server host cannot be null.');
	if(!args.port) throw new Error('The server port cannot be null.');
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
	var pos = 1;

	var argsMap = {
		main: args[pos]
	};

	for(var i=++pos, j=args.length; i<j; i++){
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

	return argsMap;
};