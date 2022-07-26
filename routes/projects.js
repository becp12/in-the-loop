var express = require('express');
var router = express.Router();
const projectsCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth');

// All routes "start with" /projects (from server.js)

// GET /projects (index functionality)
router.get('/', projectsCtrl.index);

// GET /projects/my (index functionality
router.get('/my', isLoggedIn, projectsCtrl.myIndex)

// GET /projects/my/new (new functionality
router.get('/my/new', isLoggedIn, projectsCtrl.new)

// GET /posts/:id (show functionality)
router.get('/:id', projectsCtrl.show)

// POST /projects/my (create functionality)
router.post('/my', isLoggedIn, projectsCtrl.create)

module.exports = router;