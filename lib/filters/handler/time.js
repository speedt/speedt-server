/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');

var Filter = function(){
	// TODO
};

module.exports = function(){
	return new Filter();
};

var pro = Filter.prototype;

pro.before = function(msg, session, next){
	session.__startTime__ = Date.now();
	next();
};

pro.after = function(err, msg, session, resp, next){
	var start = session.__startTime__;
	if('number' === typeof start){
		var timeUsed = Date.now() - start;
		var log = {
			route: msg.__route__,
			args: msg,
			time: utils.format(new Date(start)),
			timeUsed: timeUsed
		};
		console.log('[%s] used time: %j.', utils.format(), log);
	}
	next(err)
};