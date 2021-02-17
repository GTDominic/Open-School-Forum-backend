const db = require("../models");
const Thread = db.thread;
const post = require("./post.controller");

exports.showthreads = (req, res) => {
    //Zeigt die Liste aller Threads

    Thread.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500);
        })
}

exports.createthreads = (req, res) => {
    const newthread = {
        Titel: req.body.title,
        userId: req.userId
    }

    Thread.create(newthread)
        .then(data => {
            req.threadId = data.dataValues.id;
            post.createpost(req, res);
        }).catch(err => {
            res.status(500).send(err);
        })
}

exports.findThreadsByUser = (req, res) => {
    Thread.findAll({ where: { userId: req.params.uid }})
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
}