// Copyright © 2014, 2015, 2016 Springer Nature
//
// This file is part of boomcatch.
//
// Boomcatch is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Boomcatch is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with boomcatch. If not, see <http://www.gnu.org/licenses/>.

/*globals require, exports */

'use strict';

var fs = require('fs'),
    path = require('path'),
    extensions;

exports.initialise = function (options) {
    return send.bind(null, options.fwdDir);
};

function getEnvLocale(env) {
    env = env || process.env;
    return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

function send (directory, data, type, separator, callback) {
    try {
        fs.appendFile(
            path.join(directory, 'boomcatch-log.' + extensions[type || 'default']),
            new Date().toLocaleString() + ' ' + data + '\n',
            function (error) {
                callback(error, data.length);
            }
        );
    } catch (error) {
        callback(error);
    }
}

extensions = {
    json: 'json',
    html: 'html',
    default: 'json'
};

