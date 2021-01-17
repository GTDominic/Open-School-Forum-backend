const db = require("../models");
const Rank = db.rank;
const UserRank = db.user_ranks;

exports.initialize = () =>  {
    //replaced by better option in the future
    const initialranks = [
        {Name: 'Admin', Display_priority: 1, On_register: false},
        {Name: 'Lehrer', Display_priority: 1, On_register: true},
        {Name: 'Schüler', Display_priority: 1, On_register: true},
        {Name: 'Mathematik', Display_priority: 2, On_register: true},
        {Name: 'Chemie', Display_priority: 2, On_register: true},
        {Name: 'BGY18', Display_priority: 3, On_register: true},
        {Name: 'BGY19', Display_priority: 3, On_register: true}
    ];

    for(var i = 0; i < initialranks.length; i++){
        Rank.create(initialranks[i])
        .catch(err => {
            console.log(err);
        });
    }
}

exports.addRankToUser = (UserID, RankName) => {
    Rank.findOne({where: {Name: RankName}})
        .then((data) => {
            var RankModel = {
                userId: UserID,
                rankId: data.dataValues.id
            };
            UserRank.create(RankModel);
        })
}

exports.getRanks = (req, res) => {
    Rank.findAll({where: {On_register: true}})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ranks."
            })
        })
}
