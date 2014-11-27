/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var path = require('path'),
	fs = require('fs'),
	utils = require('speedt-utils'),
	EventEmitter = require('events').EventEmitter;

var appUtil = require('./util/appUtil'),
	Constants = require('./util/constants');

var Application = module.exports = {};

var STATE_INITED  = 1,	// app has inited
	STATE_START   = 2,	// app start
	STATE_STARTED = 3,	// app has started
	STATE_STOPED  = 4;	// app has stoped

Application.init = function(opts){
	var self = this;
	self.startTime = Date.now();
	opts = opts || {};
	self.settings = {};

	var base = opts.base || path.dirname(require.main.filename);
	this.set(Constants.RESERVED.BASE, base, true);

	appUtil.defaultConfiguration(self);

	self.loaded = [];
	self.components = [];
	self.event = new EventEmitter();
	self.state = STATE_INITED;
	console.log('[%s] app inited: %j.', utils.format(), self.getServerId());
};

Application.start = function(cb){
	var self = this;
	if(self.state > STATE_INITED){
		utils.invokeCallback(cb, new Error('app has already start'));
		return;
	}
};

Application.loadConfigBaseApp = function(key, val){
	var env = this.get(Constants.RESERVED.ENV);
	var originPath = path.join(this.getBase(), val);
	if(fs.existsSync(originPath)){
		var file = require(originPath);
		file = file[env];
		this.set(key, file);
	}else{
		console.error('[%s] invalid configuration with file path: %j.', utils.format(), key);
	}
};

Application.getServerId = function(){
	return 'upl-server-1';
};

Application.getBase = function(){
	return this.get(Constants.RESERVED.BASE);
};

Application.set = function(key, val){
	this.settings[key] = val;
	return this;
};

Application.get = function(setting){
	return this.settings[setting];
};