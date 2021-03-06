/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');

module.exports = function(app, opts){
	return new Component(app, opts);
};

var Component = function(app, opts){
	var self = this;
	opts = opts || {};
};

var pro = Component.prototype;

pro.name = '__connector__';

pro.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

pro.stop = function(force, cb){
	var self = this;
	process.nextTick(cb);
};