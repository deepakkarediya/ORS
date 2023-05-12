
const express = require('express');
const router = express.Router();
const fetchregis = require("../middleware/fetchregis");
const Marksheet = require("../models/Addmarksheet");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/marksheet//fetchmarksheet". Login required
router.get('/fetchmarksheet', fetchregis, async (req, res) => {
    try {

        const marksheet = await Marksheet.find({ regis: req.regis1.id });
        res.json(marksheet)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/marksheet/addmarksheet". Login required
router.post('/addmarksheet', fetchregis, [
    body('name', 'Enter a valid name').isLength({ min: 1 }),
    body('rollno', 'Enter a valid rollno').isLength({ min: 1}),
    body('physics', 'Enter a valid physics no').isLength({ min: 1 }),
    body('chemistry', 'Enter a valid chemistry no').isLength({ min:1 }),
    body('maths', 'Enter a valid maths no').isLength({ min: 1 })],
    async (req, res) => {

        try {
            const { name,rollno,physics,chemistry,maths } = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const marksheet = new Marksheet({
                regis: req.regis1.id,
                name,
                rollno,
                physics,
                chemistry,
                maths                            
            })
            const savedMarksheet = await marksheet.save();
            res.json(savedMarksheet)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

   // ROUTE 3: Update an existing Note using: POST "/api/marksheet/updatemarksheet". Login required
router.put('/updatemarksheet/:id', fetchregis, async (req, res) => {
    const {name,rollno,physics,chemistry,maths} = req.body;
    // Create a newNote object
    const newNote  = {};
    if(name){newNote.name = name};
    if(rollno){newNote.rollno = rollno};
    if(physics){newNote.physics = physics};
    if(chemistry){newNote.chemistry = chemistry};
    if(maths){newNote.maths = maths};

    // Find the note to be updated and update it
    let marksheet = await Marksheet.findById(req.params.id);
    if(!marksheet){return res.status(404).send("Not Found")}

    if(marksheet.regis.toString() !== req.regis1.id){
        return res.status(401).send("Not Allowed");
    }

    marksheet = await Marksheet.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({marksheet});

    })

    // ROUTE 4: Delete an existing Note using: DELETE "/api/marksheet/deletemarksheet". Login required
router.delete('/deletemarksheet/:id', fetchregis, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let marksheet= await Marksheet.findById(req.params.id);
        if (!marksheet) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (marksheet.regis.toString() !== req.regis1.id) {
            return res.status(401).send("Not Allowed");
        }

        marksheet = await Marksheet.findByIdAndDelete(req.params.id)
        res.json({ Success: "student has been deleted", marksheet: marksheet });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;  