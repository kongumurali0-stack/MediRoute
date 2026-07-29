const express = require("express");
const router = express.Router();

let drivers = [
    {
        id:1,
        name:"Raj",
        vehicle:"TN38 AB 1234",
        status:"Offline"
    },
    {
        id:2,
        name:"Kumar",
        vehicle:"TN37 CD 5678",
        status:"Offline"
    }
];


router.get("/", (req,res)=>{
    res.json(drivers);
});


module.exports = router;