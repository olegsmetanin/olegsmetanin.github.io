'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var lunr = require('lunr');
var fs = require('fs');
var marked = require('marked');

module.exports = function(opts) {

    var stream = through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(null, file);
        }

        if (file.isBuffer()) {
            var sitemap = JSON.parse(file.contents);
            var index = lunr(function() {
                this.field('tags', {
                    boost: 10
                })
                this.field('title', {
                    boost: 5
                })
//                this.field('body')
                this.ref('id')
            })

            for (var resourcePath in sitemap) {
                var resource = sitemap[resourcePath];
                var text = fs.readFileSync(file.base + resource.src, 'utf8');

                index.add({
                    id: resourcePath,
                    title: resource.title,
                    tags: resource.tags.join(' '),
//                    body: text
                })
            }
            file.path = file.base + (opts.filename || 'searchindex.json');
            file.contents = new Buffer(JSON.stringify(index.toJSON()));
            return cb(null, file);
        }
    });

    return stream;
}