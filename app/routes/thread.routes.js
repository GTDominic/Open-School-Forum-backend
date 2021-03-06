module.exports = app => {
    const thread = require("../controllers/thread.controller.js");
    const authJwt = require("../middleware/authJwt.js");

    var router = require("express").Router();

    //Get threadlist
    router.get("", thread.showthreads);

    router.post(
        "/new",
        [authJwt.verifyToken],
        thread.createthreads
    );

    router.get("/user/:uid", thread.findThreadsByUser);

    app.use('/threads', router);
}