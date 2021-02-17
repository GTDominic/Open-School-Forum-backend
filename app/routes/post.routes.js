module.exports = app => {
    const post = require("../controllers/post.controller");
    const authJwt = require("../middleware/authJwt.js");
    
    var router = require("express").Router();

    router.get("/:tid", post.getThreadWithPosts);

    router.post(
        "/:tid", 
        [authJwt.verifyToken],
        post.createtpost
    )

    router.get("/user/:uid", post.findPostsByUser);

    app.use('/thread', router);
}