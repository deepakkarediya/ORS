const express = require('express');
const router = express.Router();
//const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const Regis = require('../models/Regis')

var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Deep$123';
const fetchregis = require("../middleware/fetchregis");
const multer =require('multer')

const Storage = multer.diskStorage({
    destination:'uploads' ,
    filename: function (req, file, cb) {      
      cb(null, Date.now()+file.originalname)
    }

  })
const upload = multer({ storage: Storage })

router.post("/register",upload.single("image"),
    // [body('fname', 'Enter a valid fname').isLength({ min: 1 }),
    // body('lname', 'Enter a valid lname').isLength({ min: 1 }),
    // body('email', 'Enter a valid email').isEmail(),
    // body('password', 'password must be atleast 5 char...').isLength({ min: 5 })],
    async (req, res) => {
            //  console.log(req.body)
            //  console.log(req.file)
        const { fname, lname, email, password } = req.body;
        //console.log(req.body);
        const imageUrl=req.file.path;
        // if(!fname||!lname||!email||!password||!imageUrl){
        //     return res.send({code:400,msg:"bad request"})
        // }
        // const upload = new Regis({ fname: fname,lname:lname,email:email,password:password,files:imageUrl, })
        // const success= await upload.save();
        // if(success){
        //     res.send(success);
        // }

        let success = false;           
      
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ success, errors: errors.array() });
        // }
        try {
         
            let regis = await Regis.findOne({ email: req.body.email });
            if (regis) {
                return res.status(200).json({ success, error: "email already exists" })
            }

            var salt = bcrypt.genSaltSync(10);
            var secPass = await bcrypt.hash(password, salt);

            regis = await Regis.create({
                fname: fname,
                lname: lname,
                email: email,
                password: secPass,
                files:imageUrl
            })
            const data = {
                regis: {
                    id: regis.id
                }
            }
            const authtoken = await jwt.sign(data, JWT_SECRET);
            success = true;
            res.send({ success, authtoken })
            // res.send({ success,message: "successfully save", user: user, authtoken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }
    })


router.post('/login', 
// [
//     body('email', 'Enter a valid email').isEmail(),
//      body('password', 'Password cannot be blank').exists(),
//     // body('password', 'password must be atleast 5 char...').isLength({ min: 5 })
// ], 
async (req, res) => {
    try {
    let success = false;

    // If there are errors, return Bad request and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ success, errors: errors.array() });
    // }
    const { email, password } = req.body;
    // if(!email){
    //     return res.status(400).json({ email:"email can't be blank"});
        
    // }else if(!password){
    //     return res.status(400).json({ password:"password can't be blank" });

    //  if(!email || !password){
    //     if(!email){
    //         return res.status(400).json({ email:"email can't be blank"});
    //     }
    //     if(!password){
    //         return res.status(400).json({ password:"password can't be blank" });
    //     }
    //     return res.status(400).json({ email:"email can't be blank",password:"password can't be blank" });
    // }

            let regis = await Regis.findOne({ email: email });
        if (!regis) {
            return res.status(400).json({ errors: " email does not match " });
        }
        const passwordCompare = await bcrypt.compare(password, regis.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: "password not match" });
        }
       
        const data = {
            regis: {
                id: regis.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, authtoken, user: regis })
        // res.send({ message: "successfully login", user: user, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/findall', fetchregis, async (req, res) => {

    try {
        const regis = await Regis.find().select("-password");
        res.send(regis);
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