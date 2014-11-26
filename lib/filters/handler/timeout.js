/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');

var DEFAULT_TIMEOUT = 3000,
	DEFAULT_SIZE = 500;

module.exports = function(timeout, maxSize){
	return new Filter(timeout || DEFAULT_TIMEOUT, maxSize || DEFAULT_SIZE);
};

var Filter = function(timeout, maxSize){
	var self = this;
	self.timeout = timeout;
	self.maxSize = maxSize;
	self.timeout = {};
	self.curId = 0;
};

var pro = Filter.prototype;

pro.before = function(msg, session, next){

};

pro.after = function(err, msg, session, resp, next){
	
};