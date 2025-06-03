const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');
const verifyToken = require('../middlewares/verifyToken');
const roleCheck = require('../middlewares/roleCheck');

router.get('/', articleController.listArticles);
router.get('/slug/:slug', articleController.getArticleBySlug);
router.get('/:id', articleController.getArticleById);
router.get('/category/:category',articleController.listArticlesByCategory)
router.get('/editor/:id', articleController.listArticlesByAuthor);

// Create, Update, Delete - restricted to editor/admin
router.post('/', verifyToken, roleCheck(['admin', 'editor']), articleController.createArticle);
router.put('/:id', verifyToken, roleCheck(['admin', 'editor']), articleController.updateArticle);
router.delete('/:id', verifyToken, roleCheck(['admin', 'editor']), articleController.deleteArticle);

// Voting - all logged in users
router.post('/:id/vote', verifyToken, articleController.voteArticle);   

// routes/articleRoutes.js
router.post('/liked', verifyToken, articleController.getLikedArticles);

module.exports = router;
