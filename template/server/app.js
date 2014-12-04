/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');

var uplserv = require('../../');

process.on('uncaughtException', function (err){
	console.error('[%s] caught exception: %j.', utils.format(), err.stack);
});

process.on('exit', function (code){
	if(0 === code){
		console.log('[%s] process exit.', utils.format())
		return
	}
	console.error('[%s] process exit with code: %s.', utils.format(), code)
});

uplserv.createApp(null, function(){
	var self = this;

	self.configure('production|development', function(){
		self.filter(uplserv.time());
		self.filter(uplserv.timeout());
	});

	self.configure('production|development', 'uplserv', function(){
		self.set('connectorConfig', {
			connector: uplserv.connectors.hyxconnector,
			heartbeat: 3
		})
	});

	self.start(function (err){
		if(err){
			console.error('[%s] app start error: %j.', utils.format(), err.message);
			return;
		}
	});
});