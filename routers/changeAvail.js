var express = require('express');
router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;
var bodyParser=require("body-Parser");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/changeAvail', function(req, res) {
	id = req.body.id;
	name = req.body.name;
	var collection = db.getDb().collection('lessons');
	collection.update({id: id}, {$set: {avail:name, user: name}}, 
		function(err, docs) {		 			
			if (err !== null)
		 			res.send(false);
		 	else
		 			res.send(true);
		 	});
});
module.exports = router;