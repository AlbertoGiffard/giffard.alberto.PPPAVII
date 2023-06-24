const express = require("express");
const loginRouter = express.Router();
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils/config");

loginRouter.post("/", async (req, res, next) => {
    
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        const correctPass = user === null?false: await bcrypt.compare(password, user.passwordHash);

        if (user && correctPass) {
            const userToken = {
                username: user.username,
                id: user._id
            }
            //puedo decirle que expire o no
            //const token = await jwt.sign(userToken, SECRET,{expiresIn:"8640s"});
            const token = await jwt.sign(userToken, SECRET);
            res.status(200).json({
                token,
                username
            })
        } else {
            next({error:"password o user name invalidado"});
        }

    } catch (error) {
        next(error);
    }
})








module.exports = loginRouter;