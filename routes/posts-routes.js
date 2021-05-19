const PostController    = require('../controllers/post-controller');
const router            = require('express').Router();

const { auth } = require('../middlewares/sessionChecker');

router.get('/create', (req, res, next) => {
    res.render('create-post');
})

router.get('/show/:id', PostController.show)

router.get('/edit/:id', PostController.edit);

router.post('/create', PostController.create);

router.get('/allpost', PostController.allpost);

router.put('/:id', PostController.update);

router.delete('/:id', PostController.delete);


module.exports = router;

