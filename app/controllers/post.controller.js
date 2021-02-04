const db = require("../models");
const Post = db.post;

exports.createpost = (req, res) => {
    const newpost = {
        Titel: req.body.ptitle,
        Message: req.body.pmessage,
        userId: req.userId,
        threadId: req.threadId
    }

    Post.create(newpost)
        .then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send(err);
        })
}