const express = require("express");
const usersRouter = express.Router();
const { User } = require("../model/user");
const bcrypt = require("bcrypt");

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
})

usersRouter.post("/", async (req, res, next) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const nuevoUser = new User({ username, passwordHash });

    nuevoUser.save()
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            next(err);
        })

})

module.exports = usersRouter;