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

var appUtil = require('./util/appUtil');

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

Application.getServerId = function(){
	return 'upl-server-1';
};

Application.set = function(key, val){
	this.settings[key] = val;
	return this;
};