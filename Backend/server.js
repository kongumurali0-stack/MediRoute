const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Home test
app.get("/", (req,res)=>{
    res.send("🚑 MediRoute Backend Running");
});


// Import routes
const ambulanceRoute = require("./routes/ambulance");
const emergencyRoute = require("./routes/emergency");


// Use routes
app.use("/api/ambulance", ambulanceRoute);
app.use("/api/emergency", emergencyRoute);



app.listen(5000,()=>{
    console.log("Server running on 5000");
});
