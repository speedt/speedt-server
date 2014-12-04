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
	self.set(Constants.RESERVED.BASE, base, true);

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

Application.configure = function(env, type, fn){
	var l = arguments.length,
		args = new Array(l - 1);
	for(var i = 0; i < l; i++) args[i] = arguments[i];
	fn = args.pop();
	env = type = Constants.RESERVED.ALL;

	if(0 < args.length) env = args[0];
	if(1 < args.length) type = args[1];

	var self = this;

	if(env === Constants.RESERVED.ALL || contains(self.settings.env, env)){
		if(type === Constants.RESERVED.ALL || contains(self.getCurServer().serverType, type)){
			fn.call(self);
		}
	}
	return self;
};

Application.before = function(filter){
	addFilter(this, Constants.KEYWORDS.BEFORE_FILTER, filter);
};

Application.filter = function(filter){
	this.before(filter);
	this.after(filter);
};

Application.after = function(filter){
	addFilter(this, Constants.KEYWORDS.AFTER_FILTER, filter);
};

Application.getServerId = function(){
	return this.get(Constants.RESERVED.SERVER_ID);
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

Application.getCurServer = function(){
	return this.settings.curServer;
};

var contains = function(str, settings){
	if(!settings) return false;
	var ss = settings.split('|');
	for(var i in ss){
		if(str === ss[i]) return true;
	}
	return false;
};

var addFilter = function(app, type, filter){
	var filters = app.get(type);
	if(!filters){
		filters = [];
		app.set(type, filters);
	}
	filters.push(filter);
};