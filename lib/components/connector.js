/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');

module.exports = function(app, opts){
	return new 
};

var Component = function(app, opts){
	var self = this;
	opts = opts || {};
};

var pro = Component.prototype;

pro.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

pro.stop = function(force, cb){
	var self = this;
	process.nextTick(cb);
};