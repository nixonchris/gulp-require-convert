# gulp-require-convert
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> CommonJS module to AMD converter plugin for [gulp](https://github.com/wearefractal/gulp) 

## Overview

Require-convert will convert CommonJs files that look like this:

```javascript
var foo = require('foo');
module.exports = foo;
```

and wrap them in a basic AMD define like this:

```javascript
define(function (require, exports, module) {
    var foo = require('foo');
    module.exports = foo;
});
```
This plugin uses the RequireJS Optimizer's internal convert function for converting modules. This function will only wrap your file in a define call if it does not already have a define call AND if it appears to be a CommonJS module.

## Usage

First, install `gulp-require-convert` as a development dependency:

```shell
npm install --save-dev gulp-require-convert
```

Then, add it to your `gulpfile.js`:

```javascript
var requireConvert = require("gulp-require-convert");

gulp.src("./src/*.js")
    .pipe(requireConvert())
    .pipe(gulp.dest("./dist"));
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-require-convert
[npm-image]: https://badge.fury.io/js/gulp-require-convert.png

[travis-url]: http://travis-ci.org/nixonchris/gulp-require-convert
[travis-image]: https://secure.travis-ci.org/nixonchris/gulp-require-convert.png?branch=master

[coveralls-url]: https://coveralls.io/r/nixonchris/gulp-require-convert
[coveralls-image]: https://coveralls.io/repos/nixonchris/gulp-require-convert/badge.png

[depstat-url]: https://david-dm.org/nixonchris/gulp-require-convert
[depstat-image]: https://david-dm.org/nixonchris/gulp-require-convert.png
