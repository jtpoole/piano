var express = require('express')
, router = express.Router();
var db = require('../db.js');
router.get('/calendar', function(req, res) {
	var collection = db.getDb().collection('lessons');
	collection.find().toArray(function(err, docs) {
	res.render("lessons",{infoMenu: "Ok!, try our first handlebars"});
})});
module.exports = router;