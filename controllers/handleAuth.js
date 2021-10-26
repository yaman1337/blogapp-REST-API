const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../env');

// signup a user
router.post('/signup', (req, res) => {
    try {
        let { username, fname, lname, email, password } = req.body;
        if (!username || !fname || !lname || !email || !password) {
            return res.status(422).json({ error: "All fields are required" });
        }
        username = username.toLowerCase();
        User.findOne({ username })
            .then(isUser => {
                if (isUser) return res.status(409).json({ error: "The username already exists." });
                User.findOne({ email })
                    .then(isMail => {
                        if (isMail) return res.status(409).json({ error: "The email already exists." });
                        bcrypt.hash(password, 12)
                            .then(hashedPassword => {
                                const newUser = new User({ username, email, fname, lname, password: hashedPassword });
                                newUser.save()
                                    .then(() => {
                                        res.status(201).json({ message: "New user created" });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.sendStatus(500);
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(500);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                    });
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })


    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// login route
router.post('/login', (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email && !username || !password) return res.status(422).json({ error: "All fields required." });
        if (email) {
            User.findOne({ email })
                .then(isUser => {
                    if (!isUser) return res.status(404).json({ error: "Email not registered." });
                    bcrypt.compare(password, isUser.password)
                        .then(doMatch => {
                            if (!doMatch) return res.status(403).json({ error: "Invalid credentials provided." });
                            const token = jwt.sign({ id: isUser._id }, secretKey);
                            res.json({ token });
                        }).catch(err => {
                            console.log(err);
                            res.sendStatus(500);
                        })
                })
        } else if (username) {
            User.findOne({ username })
                .then(isUser => {
                    if (!isUser) return res.status(404).json({ error: "Username not found." });
                    bcrypt.compare(password, isUser.password)
                        .then(doMatch => {
                            if (!doMatch) return res.status(403).json({ error: "Invalid credentials provided." });
                            const token = jwt.sign({ id: isUser._id }, secretKey);
                            res.json({ token });
                        }).catch(err => {
                            console.log(err);
                            res.sendStatus(500);
                        })
                })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"})
    }
});

module.exports = router;
