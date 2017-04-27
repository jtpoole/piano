'use strict';
var MongoClient = require('mongodb').MongoClient;
var testDb=null;

exports.connect = function(url, callback) {
	if (testDb) 
		return callback();
	MongoClient.connect(url, function(err, db) {
		if (err) return callback(err);
			testDb = db;
		callback();
	})
}

exports.close = function(callback) {
	if (testDb) {
		testDb.close(function(err, result)	{
			testDb = null;
			callback(err)
		});
}};

exports.getDb = function() {
	return testDb;
}