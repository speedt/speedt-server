/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils'),
	colors = require('colors');

var app = require('../../');

process.on('uncaughtException', function (err){
	console.error(err.stack.red);
});

process.on('exit', function (code){
	if(0 === code){
		console.log('[WARN ] [%s] process exit.'.yellow, utils.format());
		return;
	}
	console.error('[ERROR] [%s] process exit with code: %s.', utils.format(), code);
});

app.createApp(null, function(){
	var self = this;

	self.configure('production|development', function(){
		self.filter(app.filter.time());
		self.filter(app.filter.timeout());
	});

	self.configure('production|development', 'upl', function(){
		self.set('connectorConfig', {
			connector: app.connector.hyxconnector,
			heartbeat: 3
		})
	});

	self.start(function (err){
		if(err){
			console.error('[ERROR] [%s] app start error: %j.'.red, utils.format(), err.message);
			return;
		}
	});
});