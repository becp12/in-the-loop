var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
const isLoggedIn = require('../config/auth');

// All routes "start with" /projects (from server.js)

// POST /projects/:id/comments (create functionality)
router.post('/:id/comments', commentsCtrl.create)

module.exports = router;