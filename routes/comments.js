var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
const isLoggedIn = require('../config/auth');

// All routes "start with" / (from server.js)

// POST /:id/comments (create functionality)
router.post('/:id/comments', isLoggedIn, commentsCtrl.create);

// DELETE /comments/:id (delete functionality)
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);

module.exports = router;