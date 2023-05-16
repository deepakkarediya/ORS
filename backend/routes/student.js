
const express = require('express');
const router = express.Router();
const fetchregis = require("../middleware/fetchregis");
const Student = require("../models/Addstudent");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/auth/fetchstudent". Login required
router.get('/fetchstudent', fetchregis, async (req, res) => {
    try {

        const student = await Student.find({ regis: req.regis1.id });
        res.json(student)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addstudent". Login required
router.post('/addstudent', fetchregis, [
    body('firstname', 'Enter a valid firname').isLength({ min: 3 }),
    body('lastname', 'Enter a valid lastname').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('mobileNo', 'mobileno must be atleast 10 char...').isLength({ min: 10 }),
    body('collegeId', 'Enter a valid collegeId').isLength({ min: 3 })],
    async (req, res) => {
        let success=false;

        try {
            const { firstname,lastname,email,mobileNo,collegeId } = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({success, error: errors.array() });
            }

            const student = new Student({
                regis: req.regis1.id,
                firstname,
                lastname,
                email,
                mobileNo,
                collegeId
                
            })
            const savedStundent = await student.save();
            success=true;
            res.json({success,savedStundent})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

   // ROUTE 3: Update an existing Note using: POST "/api/notes/updatestudent". Login required
router.put('/updatestudent/:id', fetchregis, async (req, res) => {
    const {firstname,lastname,email,mobileNo,collegeId} = req.body;
    // Create a newNote object
    const newNote  = {};
    if(firstname){newNote.firstname = firstname};
    if(lastname){newNote.lastname = lastname};
    if(email){newNote.email = email};
    if(mobileNo){newNote.mobileNo = mobileNo};
    if(collegeId){newNote.collegeId = collegeId};

    // Find the note to be updated and update it
    let student = await Student.findById(req.params.id);
    if(!student){return res.status(404).send("Not Found")}

    if(student.regis.toString() !== req.regis1.id){
        return res.status(401).send("Not Allowed");
    }

    student = await Student.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({student});

    })

    // ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletestudent". Login required
router.delete('/deletestudent/:id', fetchregis, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let student= await Student.findById(req.params.id);
        if (!student) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (student.regis.toString() !== req.regis1.id) {
            return res.status(401).send("Not Allowed");
        }

        student = await Student.findByIdAndDelete(req.params.id)
        res.json({ "Success": "student has been deleted", student: student });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;  