const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const genreRouter = require('./genreRouter');
const bookRouter = require('./bookRouter');

router.use('/user', userRouter);
router.use('/genre', genreRouter);
router.use('/book', bookRouter);

module.exports = router;