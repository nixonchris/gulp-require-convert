'use strict';

var es = require('event-stream'),
	requirejs = require('requirejs'),
	convert;


requirejs.tools.useLib(function (require) {
    convert = require('commonJs').convert;
});


module.exports = function () {
	return es.map(function (file, callback) {
		var through,
			wait;

		if (file.isStream()) {

			through = es.through();
			wait = es.wait(function (err, contents) {
				through.write(convert(file.relative, contents));
				through.end();
			});

			file.contents.pipe(wait);
			file.contents = through;

		} else if (file.isBuffer()) {
			file.contents = new Buffer(convert(file.relative, file.contents));
		}

		callback(null, file);
	});
};