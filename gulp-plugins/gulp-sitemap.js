'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var lunr = require('lunr');
var fs = require('fs');

// <?xml version="1.0" encoding="UTF-8"?>
// <urlset
//         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
//             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//     <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->

//     <url>
//         <loc>https://structuredway.com/</loc>
//         <lastmod>2014-04-01T13:15:41+00:00</lastmod>
//     </url>
//     <url>
//         <loc>https://structuredway.com/demo/</loc>
//         <lastmod>2014-04-01T13:03:11+00:00</lastmod>
//     </url>
// </urlset>


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
            var urls = [];
            for (var resourcePath in sitemap) {
                urls.push(opts.url + resourcePath)
            }

            var sm = ''
                +'<?xml version="1.0" encoding="UTF-8"?>\r\n'
                +'<urlset '
                +'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
                +'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                +'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 '
                +' http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
                +urls.map(function (loc) {
                    return ''
                        +'<url>\r\n'
                        +'<loc>'+loc+'</loc>\r\n'
                        +'<lastmod>'+(new Date()).toISOString()+'</lastmod>\r\n'
                        +'</url>\r\n'
                }).join('')
                +'</urlset>';

            file.path = file.base + (opts.filename || 'sitemap.xml');
            file.contents = new Buffer(sm);
            return cb(null, file);
        }
    });

    return stream;
}