var express = require('express');
var router = express.Router();
const projectsCtrl = require('../controllers/projects');
// const isLoggedIn = require('../config/auth');

// All routes "start with" /projects (from server.js)

// GET /projects (index functionality)
router.get('/', projectsCtrl.index);

// GET /projects/my (index functionality
router.get('/my', projectsCtrl.myIndex)

module.exports = router;