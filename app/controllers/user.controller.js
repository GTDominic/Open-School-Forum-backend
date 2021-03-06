const db = require("../models");
const User = db.user;
const Rank = db.rank;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Rankc = require("./rank.controller");
const authConfig = require("../config/auth.config");

exports.register = (req, res) => {
    //Content validation and Email validation in frontend
    //Email expected to be in correct form

    //Check if username is in use

    User.findOne({
        where: {
            Username: req.body.Username
        }
    }).then(function(user){
        if(user){
            //If user found send message back
            res.status(409).send({
                message: 'Nutzername "' + user.Username + '" ist bereits in Verwendung.'
            });
        } else {
            //If not check if Email is already existing
            User.findOne({
                where: {
                    Email: req.body.Email
                }
            }).then(function(user){
                //If Email found send message back
                if(user){
                    res.status(409).send({
                        message: 'Email "' + user.Email + '" ist bereits in Verwendung.'
                    });
                } else {
                    //If not create user (with hashed password)
                    const user = {
                        Username: req.body.Username,
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        Email: req.body.Email,
                        Password: bcrypt.hashSync(req.body.Password, bcrypt.genSaltSync(10), null) //Hash password
                    }
        
                    User.create(user)
                        .then(data => {
                            res.status(201).send({
                                message: 'Benutzer erfolgreich angelegt'
                            });
                            for(var i = 0; i < req.body.Ranks.length; i++){
                                Rankc.addRankToUser(data.id, req.body.Ranks[i]);
                            }
                        }).catch(err => {
                            res.status(500);
                        });
                }
            });
        }
    });
}

exports.singin = (req, res) => {
    User.findOne({ where: { Username: req.body.UsernameEmail }, include: Rank})
        .then(user => {
            if (!user) {
                User.findOne({ where: { Email: req.body.UsernameEmail }, include: Rank})
                    .then(user => {
                        if(!user){
                            return res.status(401).send({ message: "Nutzername oder Passwort inkorrekt." });
                        } else {
                            onUserFound(user);
                        }
                    });
            } else {
                onUserFound(user);
            }

            
            function onUserFound(userdata) {
                var passwordIsValid = bcrypt.compareSync(
                    req.body.Password,
                    userdata.Password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({ message: "Nutzername oder Passwort inkorrekt." });    // Gleiche Res bei Passworterror wie bei Nutzernameerror
                }

                var jwtExpiresIn = 86400;

                var token = jwt.sign({ id: userdata.id }, authConfig.secret, {
                    expiresIn: jwtExpiresIn    // 24h

                    // ToDo:
                    // evtl. in Zukunft abhängig von Nutzerinput ob angemeldet bleiben oder nicht
                    //
                });

                var authorities = [];
                for (let i = 0; i< userdata.ranks.length; i++){
                    authorities.push("ROLE_" + userdata.ranks[i].Name.toUpperCase());
                }
                res.status(200).send({
                    accessToken: token,
                    expiresIn: jwtExpiresIn
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getUserList = (req, res) => {
    User.findAll().then(data => {
        let biggestId = 0;
        for(let i = 0; i < data.length; i++){
            if(biggestId < data[i].id){
                biggestId = data[i].id
            }
        }
        biggestId++;

        let userlist = new Array(biggestId);

        for(let i = 0; i < userlist.length; i++){
            userlist[i] = {};
        }
    
        //Refine Userdata
        for(let i = 0; i < data.length; i++){
            userlist[data[i].id].id = data[i].id;
            userlist[data[i].id].Username = data[i].Username;
        }

        res.status(200).send(userlist);
    })
}

exports.getUser = (req, res) => {
    User.findOne({where: { id: req.params.uid }})
        .then(data => {
            let udata = {};
            udata.Username = data.Username;

            res.status(200).send(udata);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}
