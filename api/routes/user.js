const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const saltRounds = 10;

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({name: req.body.name})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'name exists'
            });
        }else {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        id: new mongoose.Types.ObjectId,
                        name: req.body.name,
                        password: hash,
                        data: ''
                    });
        
                    user.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'user created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    User.find({name: req.body.name})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            })
        }else {
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    var token = jwt.sign(
                        {
                            name: user[0].name
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )
                    return res.status(200).json({
                        message: 'Auth succeed',
                        token: token,
						data: user[0].data
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
})

module.exports = router;