const db = require("../models");
const Thread = db.thread;

exports.showthreads = () => {
    //Zeigt die Liste aller Threads

    Thread.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500);
        })
}