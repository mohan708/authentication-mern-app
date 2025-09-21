const router = require('express').Router();

const { signup,login} = require('../Controllers/AuthController');
const {signupValidation, loginValidation} = require('../Middlewares/AuthValidation');

// router.post('/login', (req,res)=>{
//     res.send('login sucess');
// })

router.post('/login', loginValidation ,login)
router.post('/signup', signupValidation ,signup)

module.exports = router;