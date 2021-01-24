module.exports = app => {
    const ranks = require("../controllers/rank.controller.js");

    var router = require("express").Router();

    //Get ranks
    router.get("", ranks.getRanks);

    app.use('/ranks', router);
}