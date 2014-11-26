/*!
 * speedt
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');

process.on('uncaughtException', function (err){
	console.error('[%s] caught exception: %j.', utils.format(), err.stack);
});

process.on('exit', function (code){
	if(0 === code){
		console.log('[%s] process exit.', utils.format())
		return
	}
	console.error('[%s] process exit with code: %s.', utils.format(), code)
});