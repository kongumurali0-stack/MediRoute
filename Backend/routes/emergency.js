const express = require("express");

const router = express.Router();


let emergencyRequests = [];


router.post("/", (req,res)=>{

    const request = {

        id: Date.now(),

        patient:req.body.patient,

        location:req.body.location,

        status:"Waiting"

    };


    emergencyRequests.push(request);


    res.json({

        message:"Emergency sent to drivers",

        request:request

    });


});



router.get("/",(req,res)=>{

    res.json(emergencyRequests);

});


module.exports = router;