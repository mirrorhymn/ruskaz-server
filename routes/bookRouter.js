const Router = require('express');
const router = new Router();
const bookController = require('../controllers/BookController');

router.post('/', bookController.create);
router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);

module.exports = router;