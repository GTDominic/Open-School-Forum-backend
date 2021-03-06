module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    //Register new user
    router.post("/register", users.register);

    router.post("/signin", users.singin);

    router.get("", users.getUserList);

    router.get("/:uid", users.getUser);

    app.use('/user', router);
}