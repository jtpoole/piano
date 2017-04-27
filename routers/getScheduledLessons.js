var express = require('express');
router = express.Router();
var db = require('../db');
router.get('/getScheduledLessons', function(req, res) {
	var collection = db.getDb().collection('lessons');
	collection.find().toArray(function(err, docs) {
		var info=[];
		for(doc of docs)
			info.push(doc);
		res.json(info);
	//   res.render('menu', {menu: docs})
})});
module.exports = router;