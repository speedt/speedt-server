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
	var cfg = loadConfigBaseApp(app);
	if(!cfg) process.exit(2);
	loadMaster(app, cfg);
	loadServers(app, cfg);
	processArgs(app, args);
	configLogger(app);
	loadLifecycle(app);
};

var loadConfigBaseApp = function(app){
	var originPath = path.join(app.getBase(), Constants.FILEPATH.SERVERS);
	var cfg = utils.loadConfigFile(originPath);
	if(cfg){
		var env = app.get(Constants.RESERVED.ENV);
		return cfg[env];
	}
};

var loadMaster = function(app, cfg){
	var master = cfg.master;
	if(master){
		app.set(Constants.RESERVED.MASTER, master);
		app.master = app.get(Constants.RESERVED.MASTER);
		delete cfg.master;
	}
};

var loadServers = function(app, cfg){
	var servers = cfg,
		slist,
		server,
		server_id,
		serverMap = {};
	for(var serverType in servers){
		slist = servers[serverType];
		for(var i=0, j=slist.length; i < j; i++){
			server = slist[i];
			server.serverType = serverType;
			server_id = server.id;
			delete server.id;
			serverMap[server_id] = server;
		}
	}
	app.set(Constants.KEYWORDS.SERVER_MAP, serverMap);
}

var setupEnv = function(app, args){
	app.set(Constants.RESERVED.ENV, args.env || process.env.NODE_ENV || Constants.RESERVED.ENV_DEV, true);
};

var processArgs = function(app, args){
	var serverType = args.serverType || Constants.RESERVED.MASTER;
	var serverId = args.id || app.getMaster().id;

	app.set(Constants.RESERVED.SERVER_TYPE, serverType, true);
	app.set(Constants.RESERVED.SERVER_ID, serverId, true);

	if (serverType !== Constants.RESERVED.MASTER){
		app.set(Constants.RESERVED.CURRENT_SERVER, args, true);
	}else{
		app.set(Constants.RESERVED.CURRENT_SERVER, app.getMaster(), true);
	}
};

var configLogger = function(){};

var loadLifecycle = function(){};

var parseArgs = function(args){
	var mainPos = 1;

	var argsMap = {
		main: args[1]
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