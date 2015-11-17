var express = require('express'),
router = express.Router(); // Possibly have to use MergeParams: true?
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {
	console.log("inside get / route");
	res.render('index');
});

router.post('/wiki', function(req, res, next) {
	console.log("inside post route");
	var body = req.body;
	var title = body.page_title;
	var content = body.page_content;
	// console.log(req.body);

	var page = new Page({
		title: title,
		content: content
	});

	page.save().then(function(savedPage) {
		console.log("Inside THENNNNNN", savedPage);
		// console.log(res.json);
		res.json(savedPage);
	})
	console.log("bottom of post");
});

router.get('/add', function(req, res, next) {
	console.log("inside get /add route");
	res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ urlTitle: req.params.urlTitle }).exec().then(function(foundPage){
    res.json(foundPage);
  }).then(null, function(err) {
  	return console.error(err);
  });
});



module.exports = router;