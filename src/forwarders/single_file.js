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
    path = require('path')

exports.initialise = function (options) {
    return send.bind(null, options.fwdDir);
};

function send (directory, data, type, separator, callback) {
    try {
        var newData = data;
        if (type === 'json') {
            var dataObj = JSON.parse(data);
            dataObj['logTime'] = new Date().toJSON();
            newData = JSON.stringify(dataObj);
        }
        fs.appendFile(
            path.join(directory, 'boomcatch-beacon.log'),
            newData + '\n',
            function (error) {
                callback(error, data.length);
            }
        );
    } catch (error) {
        callback(error);
    }
}
