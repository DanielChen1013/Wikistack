var express = require('express'),
router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {
	console.log("inside get / route");
	res.render('index');
});

router.post('/wiki/', function(req, res, next) {
	console.log("inside post route");
	var body = req.body;
	var title = body.page_title;
	var content = body.page_content;

	var page = new Page({
	   title: title,
	   content: content
	 });

	page.save().then(function() {
		res.redirect('/');
	});
});

router.get('/add', function(req, res, next) {
	console.log("inside get /add route");
	res.render('addpage');
});

module.exports = router;