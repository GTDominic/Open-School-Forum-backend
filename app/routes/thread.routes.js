const { thread } = require("../models/index.js");

module.exports = app => {
    const thread = require("../controllers/thread.controller.js");

    var router = require("express").Router();

    //Get threadlist
    router.get("", thread.showthreads);

    app.use('/threads', router);
}