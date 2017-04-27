var express = require('express'), 
 router = express.Router();
 var db = require('../db');
 var ObjectId = require('mongodb').ObjectID;
 var bodyParser=require("body-Parser");
 var unique=true;
 router.use(bodyParser.urlencoded({extended: true}));
 router.use(bodyParser.json());

 router.post('/signupServer', function(req, res) {
 	username= req.body.username;
 	pwd= req.body.pwd;
 	fullName= req.body.fullName;
 	var collection = db.getDb().collection("users");
 	collection.find().toArray(function(err, docs) {
		for(doc of docs){
			if(doc.username == username){
				unique=false;
				break;
			}
			else
				unique=true;
			console.log(doc.username);
			console.log(username);
			//console.log(unique);
		}
	});
		console.log(unique);
 		if(unique==true)
 		{
	 			collection.insert({"username": username, "password": pwd, "fullName": fullName}, function(err, document) {
		 			if (err !== null)
		 				res.send(false);
		 			else
		 				res.send(true);
	 			});
	 	}
 		else
 			console.log("Username Taken!");
});
module.exports = router;