const { rank } = require("../models/index.js");

module.exports = app => {
    const ranks = require("../controllers/rank.controller.js");

    var router = require("express").Router();

    //Register new user
    router.get("", ranks.getRanks);

    app.use('/ranks', router);
}