const router = require('express').Router();
  
const { auth } = require('../middlewares/sessionChecker')

router.get('/', auth, (req, res, next) => {
     res.render('index', { title : "Home Page "});
})

router.use('/auth/', require('./auth-routes'));

router.use('/posts/', auth, require('./posts-routes'));

router.use('/comments/', auth, require('./commets-routes') )

module.exports = router;