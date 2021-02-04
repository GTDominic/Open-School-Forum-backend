const db = require("../models");
const Thread = db.thread;

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
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send(err);
        })
}