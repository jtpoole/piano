'use strict';
var MongoClient = require('mongodb').MongoClient;
var lessonDb=null;

exports.connect = function(url, callback) {
	if (lessonDb) 
		return callback();
	MongoClient.connect(url, function(err, db) {
		if (err) return callback(err);
			lessonDb = db;
		callback();
	})
}

exports.close = function(callback) {
	if (lessonDb) {
		lessonDb.close(function(err, result)	{
			lessonDb = null;
			callback(err)
		});
}};

exports.getDb = function() {
	return lessonDb;
}