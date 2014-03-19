/*global describe, it*/
'use strict';

var fs = require('fs'),
	es = require('event-stream'),
	should = require('should');

require('mocha');

delete require.cache[require.resolve('../')];

var gutil = require('gulp-util'),
	requireConvert = require('../');

describe('gulp-require-convert', function () {

	var expectedFile = new gutil.File({
			path: 'test/expected/common.js',
			cwd: 'test/',
			base: 'test/expected',
			contents: fs.readFileSync('test/expected/common.js')
		}),
		amdFile = new gutil.File({
			path: 'test/expected/common.js',
			cwd: 'test/',
			base: 'test/expected',
			contents: fs.readFileSync('test/fixtures/amd.js')
		}),
		normalFile = new gutil.File({
			path: 'test/expected/common.js',
			cwd: 'test/',
			base: 'test/expected',
			contents: fs.readFileSync('test/fixtures/normal.js')
		});

	it('should produce expected file via buffer', function (done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/common.js',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.readFileSync('test/fixtures/common.js')
		});

		var stream = requireConvert();

		stream.on('error', function (err) {
			should.not.exist(err);
			done(err);
		});

		stream.on('data', function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(String(expectedFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it('should produce expected file via stream', function (done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/common.js',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.createReadStream('test/fixtures/common.js')
		});

		var stream = requireConvert();

		stream.on('error', function (err) {
			should.not.exist(err);
			done();
		});

		stream.on('data', function (newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);

			newFile.contents.pipe(es.wait(function (err, data) {
				should.not.exist(err);
				String(data).should.equal(String(expectedFile.contents));
				done();
			}));
		});

		stream.write(srcFile);
		stream.end();
	});

	it('should not modify files that are already AMD', function (done) {
		var stream = requireConvert();

		stream.on('error', function (err) {
			should.not.exist(err);
			done(err);
		});

		stream.on('data', function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(String(amdFile.contents));
			done();
		});

		stream.write(amdFile);
		stream.end();
	});

	it('should not modify files that are not commonjs modules', function (done) {
		var stream = requireConvert();

		stream.on('error', function (err) {
			should.not.exist(err);
			done(err);
		});

		stream.on('data', function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(String(normalFile.contents));
			done();
		});

		stream.write(normalFile);
		stream.end();
	});

});