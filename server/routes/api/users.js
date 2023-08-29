const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load User model
const User = require('../../models/User')

//load input validation
const validateRegisterInput = require('../../validation/register'); 
const validateLoginInput = require('../../validation/login');


// @route       GET api/user/login
// @desc        Login user route
// @access      Public
router.post('/login', (req, res) => {
    console.log(req.body.email, req.body.password)
    const { errors, isValid } = validateLoginInput(req.body);
    // Check Validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.scan({ email: {eq: req.body.email} })
    .exec()
    .then(result => {
        if (result.count === 0) {
            errors.email = 'Email not registered';
            console.log('Email not registered');
            return res.status(400).json(errors);
        } else {
            const user = result[0];
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    //create jwt payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                    }
                    
                    // make JWT token (sign token) (payload obj, secretKey, expires obj) 
                    // set token to expire in 1 month (2419200)
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 2419200 }, (err, token) => {
                        res.json({
                            success: true, 
                            token: 'Bearer ' + token,
                            user: user
                        })
                    });

                } else {
                    errors.password = "Password Incorrect";
                    return res.status(400).json(errors)
                }
            });
 
        }
    });
});


// @route       GET api/user/register
// @desc        Register user route
// @access      Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.scan({ email: {eq: req.body.email} })
    .exec()
    .then(result => {
        if (result.count != 0) { 
            console.log('Email already exists');
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                    console.log("**********USER ADDED: ", newUser)
                });
            });
        }
    });
});


// @route       GET api/user/current
// @desc        return current user
// @access      Private3
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ 
        id: req.user.id,
        name: req.user.name,
        email: req.user.email 
    })
});


module.exports = router;