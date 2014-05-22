var path = require('path')
, gutil = require('gulp-util')
, through = require('through2')
, crypto = require('crypto');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        var d = calcMd5(file)
        , filename = path.basename(file.path)
        , dir;

        if(file.path[0] == '.'){
            dir = path.join(file.base, file.path);
        } else {
            dir = file.path;
        }
        dir = path.dirname(dir);

        filename = filename.split('.').map(function(item, i){
            return i == 0 ? item + '_'+ d : item;
        }).join('.');

        file.path = path.join(dir, filename);

        this.push(file);
        cb();
    }, function (cb) {
        cb();
    });
};


function calcMd5(file){
    var md5 = crypto.createHash('md5');
    md5.update(file.contents, 'utf8');
    return md5.digest('hex').slice(0, 10);
}