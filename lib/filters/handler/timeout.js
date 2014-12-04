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
	self.timeouts = {};
};

var pro = Filter.prototype;

pro.before = function(msg, session, next){
	var self = this;
	var count = utils.size(self.timeouts);
	if(count > self.maxSize){
		console.log('[%s] timeout filter is out of range, current size is %s, max size is %s.', utils.format(), count, self.maxSize);
		next();
		return;
	}
	var curId = utils.genObjectId();
	self.timeouts[curId] = setTimeout(function(){
		console.warn('[%s] request %j timeout.', utils.format(), msg.__route__);
	}, self.timeout);
	session.__timeout__ = curId;
	next();
};

pro.after = function(err, msg, session, resp, next){
	var timeout = this.timeouts[session.__timeout__];
	if(timeout){
		clearTimeout(timeout);
		delete this.timeouts[session.__timeout__];
	}
	next(err);
};