module.exports = app => {
    const thread = require("../controllers/thread.controller");
    
    var router = require("express").Router();

    router.get("/:tid", thread.getThreadWithPosts);

    app.use('/post', router);
}