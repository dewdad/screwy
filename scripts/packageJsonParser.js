'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _terminalLogger = require('./terminalLogger');

var _terminalLogger2 = _interopRequireDefault(_terminalLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _remote = require('remote');

var _remote2 = _interopRequireDefault(_remote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packageJsonPath = _path2.default.join(process.cwd(), 'package.json');
var ipcRenderer = _electron2.default.ipcRenderer;

function parsePackageJson(configObj, cb) {
	console.log('package path:', packageJsonPath);
	_fs2.default.readFile(packageJsonPath, 'utf8', function (err, data) {
		if (err) {
			(0, _terminalLogger2.default)('(package.json error) ' + err);
			ipcRenderer.send('error');
		}

		var jsonData = undefined;
		try {
			jsonData = JSON.parse(data);
		} catch (e) {
			(0, _terminalLogger2.default)(err);
			ipcRenderer.send('error');
		}

		// set title if not already set
		if (!configObj.title) configObj.title = jsonData.name;

		if (!jsonData.scripts) console.log('No Scripts.'); // add error handler

		configObj.scripts = jsonData.scripts;

		cb(configObj);
	});
}

module.exports = parsePackageJson;