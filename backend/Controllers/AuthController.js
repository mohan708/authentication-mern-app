const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        console.log("Incoming signup data:", req.body);
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        console.log("Incoming signup data:", req.body);
        const {  email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "auth failed eamil and password is wrong"
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        
        const isPassEqual = await bcrypt.compare(password, user.password);
       

        if(!isPassEqual) {
            return res.status(403)
            .json({ message: errorMsg, success: false });
        };

        const jwtToken  = jwt.sign(
            {
                email:user.email, id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )
       
        res.status(200)
            .json({
                message: "Signup successfully",
                success: true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errrors",
                success: false
            })
    }
}


module.exports = {
    signup,
    login
}