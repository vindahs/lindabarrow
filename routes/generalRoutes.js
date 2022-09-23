var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
    res.render('products', { title: 'Express' });
});

router.get('/gallery', function(req, res, next) {
    res.render('gallery', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Express' });
});

module.exports = router;
