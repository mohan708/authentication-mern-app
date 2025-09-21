
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message: "unauthorized jwt token is require"});
    }

    try{
        const decode = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(err){
        return res.status(401).json({message: "unauthorized jwt token is wrong or expied"})
    }
}

module.exports = ensureAuthenticated