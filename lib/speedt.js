/*!
 * speedt
 * Copyright(c) 2014 huangxin <huangxin@foreworld.net>
 * MIT Licensed
 */
'use strict';

var fs = require('fs'),
	path = require('path');

var application = require('./application');

var SpeedT = module.exports = {
	version: '1.0.0',	// Current version
	components: {},
	filters: {},
	rpcFilters: {},
	connectors: {}
};

var self = this;

var load = function(path, name){
	if(name) return require(path + name);
	return require(path);
};

SpeedT.createApp = function(opts, cb){
	var app = application;
	app.init(opts);
	self.app = app;
	cb.bind(app)();
};
