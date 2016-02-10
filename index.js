var path = require('path')
  , gutil = require('gulp-util')
  , through = require('through2')
  , crypto = require('crypto');

module.exports = function(options) {
  var separator, size, printOnly;

  if (typeof options === 'object') {
    printOnly = options.printOnly || false;
    separator = options.separator || '_';
    size = options.size | 0;
  } else {
    size = options | 0;
    separator = '_';
    printOnly = false;
  }

  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
      return cb();
    }

    var md5Hash = calcMd5(file, size),
      filename = path.basename(file.path),
      dir;

    if (printOnly) {
      gutil.log(filename + ' ' + md5Hash);
      return cb(null, file)
    }

    if (file.path[0] == '.') {
      dir = path.join(file.base, file.path);
    } else {
      dir = file.path;
    }
    dir = path.dirname(dir);

    filename = filename.split('.').map(function(item, i, arr) {
      return i == arr.length - 2 ? item + separator + md5Hash : item;
    }).join('.');

    file.path = path.join(dir, filename);

    this.push(file);
    cb();
  }, function(cb) {
    cb();
  });
};

function calcMd5(file, slice) {
  var md5 = crypto.createHash('md5');
  md5.update(file.contents, 'utf8');

  return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
