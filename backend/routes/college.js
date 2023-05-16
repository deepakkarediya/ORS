
const express = require('express');
const router = express.Router();
const fetchregis = require("../middleware/fetchregis");
const College = require("../models/Addcollege");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/marksheet/fetchcollege". Login required
router.get('/fetchcollege', fetchregis, async (req, res) => {
    try {

        const college = await College.find({ regis: req.regis1.id });
        res.json(college)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/college/addcollege". Login required
router.post('/addcollege', fetchregis, [
    body('collegename', 'Enter a valid collegename').isLength({ min: 1 }),
    body('address', 'Enter a valid address').isLength({ min: 1 }),
    body('city', 'Enter a valid city').isLength({ min:1 }),
    body('state', 'Enter a valid state').isLength({ min: 1 }),
    body('mobileno', 'Enter a valid mobileno').isLength({ min: 1 })],
    async (req, res) => {

        try {
            let success=false;
            const { collegename,address,city,state,mobileno } = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success,error: errors.array() });
            }

            const college = new College({
                regis: req.regis1.id,
                collegename,
                address,
                city,
                state,
                mobileno                         
                   })
            const savedCollege = await college.save();
            success=true;
            res.json({success,savedCollege})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

   // ROUTE 3: Update an existing Note using: POST "/api/college/updatecollege". Login required
router.put('/updatecollege/:id', fetchregis, async (req, res) => {
    const {name,rollno,physics,chemistry,maths} = req.body;
    // Create a newNote object
    const newNote  = {};
    if(name){newNote.name = name};
    if(rollno){newNote.rollno = rollno};
    if(physics){newNote.physics = physics};
    if(chemistry){newNote.chemistry = chemistry};
    if(maths){newNote.maths = maths};

    // Find the note to be updated and update it
    let college = await College.findById(req.params.id);
    if(!college){return res.status(404).send("Not Found")}

    if(college.regis.toString() !== req.regis1.id){
        return res.status(401).send("Not Allowed");
    }

    college = await College.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({college});

    })

    // ROUTE 4: Delete an existing Note using: DELETE "/api/college/deletecollege". Login required
router.delete('/deletecollege/:id', fetchregis, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let college= await College.findById(req.params.id);
        if (!college) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (college.regis.toString() !== req.regis1.id) {
            return res.status(401).send("Not Allowed");
        }

        college = await College.findByIdAndDelete(req.params.id)
        res.json({ "Success": "student has been deleted", college: college });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;  