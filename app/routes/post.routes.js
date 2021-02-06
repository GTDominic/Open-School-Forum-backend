module.exports = app => {
    const post = require("../controllers/post.controller");
    
    var router = require("express").Router();

    router.get("/:tid", post.getThreadWithPosts);

    app.use('/thread', router);
}