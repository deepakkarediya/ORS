const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const Regis = require('../models/Regis')
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Deep$123';
const fetchregis = require("../middleware/fetchregis");


router.post("/register",[body('fname', 'Enter a valid fname').isLength({ min: 1 }),
    body('lname', 'Enter a valid lname').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 char...').isLength({ min: 5 })],
    async (req, res) => {
        let success = false;

        const { fname, lname, email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let regis = await Regis.findOne({ email: req.body.email });
            if (regis) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
            }

            var salt = bcrypt.genSaltSync(10);
            var secPass = await bcrypt.hash(password, salt);

            regis = await Regis.create({
                fname: fname,
                lname: lname,
                email: email,
                password: secPass,
            })

            const data = {
                regis: {
                    id: regis.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.send({ success, authtoken })
            // res.send({ success,message: "successfully save", user: user, authtoken })


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

    })


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let regis = await Regis.findOne({ email });
        // console.log(regis);
        if (!regis) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, regis.password);
        if (!passwordCompare) {

            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            regis: {
                id: regis.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, authtoken })
        // res.send({ message: "successfully login", user: user, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})




router.post('/getregis', fetchregis, async (req, res) => {

    try {
        const userId = req.regis1.id;
        const regis = await Regis.findById(userId).select("-password");
        res.send(regis);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;  