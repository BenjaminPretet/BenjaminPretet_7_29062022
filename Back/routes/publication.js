const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../Middleware/multer-config');

const publicationCtrl = require('../controllers/publication');
const likesCtrl = require('../Controllers/likes');

router.post('/', auth, multer, publicationCtrl.createSauce);
router.put('/:id', auth, multer, publicationCtrl.modifySauce);
router.delete('/:id', auth, publicationCtrl.deleteSauce);
router.get('/:id', auth, publicationCtrl.getOneSauce);
router.get('/', auth, publicationCtrl.getAllSauces);

router.post('/:id/like', auth, likesCtrl.addLikeOrDislike);

module.exports = router;