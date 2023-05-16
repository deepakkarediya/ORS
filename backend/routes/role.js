
const express = require('express');
const router = express.Router();
const fetchregis = require("../middleware/fetchregis");
const Role= require("../models/Addrole");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/role/fetchrole". Login required
router.get('/fetchrole', fetchregis, async (req, res) => {
    try {

        const role = await Role.find({ regis: req.regis1.id });
        res.json(role)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/role/addrole". Login required
router.post('/addrole', fetchregis, [
    body('rolename', 'Enter a valid rolename').isLength({ min: 1}),
    body('description', 'Enter a valid description').isLength({ min: 1 })],
  
    async (req, res) => {

        try {
            let success=false;
            const {rolename,description} = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success,error: errors.array() });
            }

            const role = new Role({
                regis: req.regis1.id,
                rolename,
                description
                
            })
            const savedRole = await role.save();
            res.json({success,savedRole})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

   // ROUTE 3: Update an existing Note using: POST "/api/role/updaterole". Login required
router.put('/updaterole/:id', fetchregis, async (req, res) => {
    const {rolename,description} = req.body;
    // Create a newNote object
    const newNote  = {};
    if(rolename){newNote.rolename = rolename};
    if(description){newNote.description = description};
    

    // Find the note to be updated and update it
    let role = await Role.findById(req.params.id);
    if(!role){return res.status(404).send("Not Found")}

    if(role.regis.toString() !== req.regis1.id){
        return res.status(401).send("Not Allowed");
    }

    role = await Role.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({role});

    })

    // ROUTE 4: Delete an existing Note using: DELETE "/api/role/deleterole". Login required
router.delete('/deleterole/:id', fetchregis, async (req, res) => {
    try {
        
        // Find the note to be delete and delete it
        let role= await Role.findById(req.params.id);
        if (!role) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (role.regis.toString() !== req.regis1.id) {
            return res.status(401).send("Not Allowed");
        }

        role = await Role.findByIdAndDelete(req.params.id)
        res.json({ "Success": "student has been deleted", role: role });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;  