var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var s = require('underscore.string');

var db = mongoose.createConnection("mongodb://localhost/osb-user-tracker", function (err) {
    if (err) {
        throw err;
    }
    console.log('Connection BDD effectuee');
});

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

exports.connection = db;

fs.readdir(__dirname + '/schemas', function (err, files) {
    for (var i in files) {
        var model = s.classify(s.strLeft(files[i], '.js'));
        exports[model] = db.model(model, require("./schemas/" + files[i]));
    }
});

exports.getCollection = function(collection) {
    return exports[collection];
};