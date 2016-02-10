# gulp-md5

> md5 plugin for [gulp](https://github.com/wearefractal/gulp).

## Usage

First, install `gulp-md5` as a development dependency:

```shell
npm install --save-dev gulp-md5
```

Then, add it to your `gulpfile.js`:

```javascript
var md5 = require("gulp-md5");

gulp.src("./src/*.ext")
	.pipe(md5({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### md5({printOnly: True})

#### printOnly
Type: `Boolean`  
Default: false

Optional: you can pass printOnly to skip md5 appending to filenames and just print md5 of file to console.

### md5(size)

#### size
Type: `String`  
Default: null

Optionnal: you can pass the size to limit the size of the hash that is appended.

Example:
```javascript
	gulp.src('**/*', {
        cwd: './src'
    })
        .pipe(md5())
        .pipe(gulp.dest('./whatever'));
```

The sample above will append the full md5 hash to each of the file matching src and store all of that into the *whatever* folder.

```shell
whatever/
├── index_a7ded4c00cdc9cdc47e55f6b85e3f909.html
├── app_6b85e3f9096b85e3f9096b85e3f90943.js
├── ...
```

If you pass the size argument, the hash will be truncated to that value. For instance md5(10) will produce:

```shell
whatever/
├── index_a7ded4c00c.html
├── app_6b85e3f909.js
├── ...
```

## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]

