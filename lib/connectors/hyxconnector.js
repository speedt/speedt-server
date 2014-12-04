/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('util'),
	EventEmitter = require('events').EventEmitter,
	utils = require('speedt-utils');

var Connector = function(server, opts){
	var self = this;
	if(!(self instanceof Connector)){
		return new Connector(server, opts);
	}
	EventEmitter.call(self);
	self.opts = opts || {};
	self.server = server;
};

util.inherits(Connector, EventEmitter);
module.exports = Connector;
var pro = Connector.prototype;

pro.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

pro.stop = function(force, cb){
	var self = this;
	process.nextTick(cb);
};