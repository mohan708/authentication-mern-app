const ensureAuthenticated = require('../Middlewares/Auth');


const router = require('express').Router();;

router.get("/", ensureAuthenticated, (req,res)=>{

    console.log("--- log in user details  ---", req.user);
    res.status(200).json([
        {
            name: "product 1",
            price: 100

        },
         {
            name: "product 2",
            price: 200

        }
    ])
})

module.exports = router;