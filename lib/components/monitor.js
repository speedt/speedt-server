/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var Component = function(app, opts){
	// TODO
};

module.exports = function(app, opts){
	return new Component(app, opts);
};

var pro = Component.prototype;

pro.name = '__monitor__';

pro.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

pro.stop = function(force, cb){
	var self = this;
	process.nextTick(cb);
};