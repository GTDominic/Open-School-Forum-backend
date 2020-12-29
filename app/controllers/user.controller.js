const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');

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
            res.status(409).send({
                message: 'Nutzername "' + user.Username + '" ist bereits in Verwendung.'
            });
        } else {
            console.log("Username alright");
            User.findOne({
                where: {
                    Email: req.body.Email
                }
            }).then(function(user){
                if(user){
                    res.status(409).send({
                        message: 'Email "' + user.Email + '" ist bereits in Verwendung.'
                    });
                } else {
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
                        }).catch(err => {
                            res.status(500);
                        });
                }
            });
        }
    });
}