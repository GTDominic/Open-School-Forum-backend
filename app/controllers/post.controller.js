const db = require("../models");
const Post = db.post;
const Thread = db.thread;

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

exports.createtpost = (req, res) => {
    req.threadId = req.params.tid;
    this.createpost(req, res);
}

exports.getThreadWithPosts = (req, res) => {
    Thread.findOne(
        { include: db.post,
        where: { id: req.params.tid }}
    ).then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

exports.findPostsByUser = (req, res) => {
    Post.findAll(
        { include: db.thread,
        where: { userId: req.params.uid }}
    ).then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}