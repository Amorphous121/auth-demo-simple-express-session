const router = require('express').Router();
const UserController = require('../controllers/user-controller')

const { auth } = require('../middlewares/sessionChecker');

router.get('/login', (req, res, next) => {
    res.render('login-page', { title : "Login "});
})

router.get('/register', (req, res, next) => {
    res.render('register-page', { title : "Register here "})
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
})


router.post('/login', UserController.login);

router.post('/register', UserController.register );

router.get('/profile', auth, UserController.profileView);

router.get('/delete/:id', auth, UserController.deleteProfile);

router.get('/update/:id', auth , UserController.updateGET);

router.put('/update/:id', auth,  UserController.updatePUT);

module.exports = router;