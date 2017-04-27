var express = require('express');
router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;
var bodyParser=require("body-Parser");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/resetAvail', function(req, res) {
	id = req.body.id;
	var collection = db.getDb().collection('lessons');
	collection.update({id: id}, {$set: {avail:"Available",user:"Available"}}, 
		function(err, docs) {		 			
			if (err !== null)
		 			res.send(false);
		 	else
		 			res.send(true);
		 	});
});
module.exports = router;