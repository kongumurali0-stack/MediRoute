import React, { useState } from "react";
import "./App.css";

import Analytics from "./Analytics";
import LiveMap from "./LiveMap";
import EmergencyButton from "./components/EmergencyButton";


function App() {


const [location,setLocation] = useState(null);

const [nearestHospital,setNearestHospital] = useState(null);

const [nearbyHospitals,setNearbyHospitals] = useState([]);

const [selectedHospitalData,setSelectedHospitalData] = useState(null);


const [ambulanceStatus,setAmbulanceStatus] = useState("Waiting");

const [eta,setEta] = useState(20);


const [timeline,setTimeline] = useState([]);

const [triageResult,setTriageResult] = useState(null);




// Ambulance Database

const ambulances = [

{
id:1,
driver:"Raj",
vehicle:"TN38 AB 1234",
latitude:11.0200,
longitude:76.9600,
status:"Online"
},

{
id:2,
driver:"Kumar",
vehicle:"TN37 CD 5678",
latitude:11.0280,
longitude:77.0000,
status:"Online"
},

{
id:3,
driver:"Arun",
vehicle:"TN66 EF 7890",
latitude:11.0300,
longitude:76.9500,
status:"Offline"
}

];



// Distance Calculator

const calculateDistance=(lat1,lon1,lat2,lon2)=>{

const R=6371;

const dLat=(lat2-lat1)*Math.PI/180;

const dLon=(lon2-lon1)*Math.PI/180;


const a=
Math.sin(dLat/2)**2+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)**2;


const c=2*Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);


return R*c;

};



// Emergency Button

const handleEmergency=()=>{


navigator.geolocation.getCurrentPosition((position)=>{


const lat=position.coords.latitude;

const lng=position.coords.longitude;



const onlineAmbulances=

ambulances

.filter(a=>a.status==="Online")

.map(a=>({

...a,

distance:calculateDistance(
lat,
lng,
a.latitude,
a.longitude
)

}))


.sort((a,b)=>a.distance-b.distance);



if(onlineAmbulances.length>0){


alert(
`🚑 Ambulance Alert Sent

Driver: ${onlineAmbulances[0].driver}

Vehicle: ${onlineAmbulances[0].vehicle}

Distance: ${onlineAmbulances[0].distance.toFixed(2)} km`
);


}



fetch("http://localhost:5000/api/emergency",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

patient:"Emergency Patient",

location:{
latitude:lat,
longitude:lng
}

})

});


});


};
// Dashboard Data

const criticalPatients = 2;

const activeAmbulances = 1;

const responseTime = 12;

const medicineAlerts = 3;




// Hospital Capacity Database

const hospitalCapacity=[

{
name:"Government Hospital Coimbatore",
beds:10,
icu:2,
doctors:8
},

{
name:"KMCH Hospital",
beds:15,
icu:5,
doctors:20
},

{
name:"PSG Hospital",
beds:8,
icu:3,
doctors:15
}

];




// Hospital Database

const hospitals=[

{
name:"Government Hospital Coimbatore",
lat:11.0168,
lng:76.9558
},

{
name:"KMCH Hospital",
lat:11.0285,
lng:77.0014
},

{
name:"PSG Hospital",
lat:11.0246,
lng:77.0067
}

];





// Medicine Database

const medicines=[

{
name:"Oxygen Cylinder",
quantity:20,
minimum:5,
expiry:"2027-05"
},

{
name:"Emergency Kit",
quantity:15,
minimum:5,
expiry:"2026-12"
},

{
name:"Vaccines",
quantity:50,
minimum:20,
expiry:"2027-01"
},

{
name:"Paracetamol",
quantity:100,
minimum:30,
expiry:"2028-03"
}

];





// Find Nearby Hospitals

const findNearbyHospitals=(lat,lng)=>{


const result=hospitals.map((hospital)=>{


const distance=Math.sqrt(

Math.pow(lat-hospital.lat,2)+
Math.pow(lng-hospital.lng,2)

);



return{

...hospital,

distance:(distance*111).toFixed(2)

};


});



result.sort(
(a,b)=>a.distance-b.distance
);



setNearbyHospitals(result);


};






// Hospital Capacity

const checkHospitalCapacity=(hospital)=>{


const data=hospitalCapacity.find(

(item)=>item.name===hospital.name

);


setSelectedHospitalData(data);


};







// Find Nearest Hospital

const findNearestHospital=(lat,lng)=>{


let nearest=null;

let shortest=Infinity;



hospitals.forEach((hospital)=>{


const distance=Math.sqrt(

Math.pow(lat-hospital.lat,2)+
Math.pow(lng-hospital.lng,2)

);



if(distance<shortest){

shortest=distance;

nearest=hospital;

}


});



setNearestHospital({

...nearest,

distance:(shortest*111).toFixed(2)

});



checkHospitalCapacity(nearest);


};






// GPS Function

const getLocation=()=>{


navigator.geolocation.getCurrentPosition(

(position)=>{


const lat=position.coords.latitude;

const lng=position.coords.longitude;



setLocation({

latitude:lat,

longitude:lng

});



findNearestHospital(lat,lng);

findNearbyHospitals(lat,lng);


},


()=>{

alert("GPS permission denied");

}


);


};





// Ambulance Tracking

const startDelivery=()=>{


setAmbulanceStatus("🚑 Ambulance Moving");


let time=20;


const timer=setInterval(()=>{


time--;


setEta(time);



if(time<=0){


clearInterval(timer);


setAmbulanceStatus("🏥 Patient Reached");


}


},1000);


};
// AI Triage Agent

const runTriageAgent=(symptoms)=>{


let priority="LOW";

let action="Normal Consultation";



if(

symptoms.includes("Chest Pain") ||

symptoms.includes("Breathing Difficulty")

){


priority="HIGH";

action="Immediate Ambulance Dispatch";


}

else if(

symptoms.includes("Fever") ||

symptoms.includes("Injury")

){


priority="MEDIUM";

action="Fast Medical Support";


}



setTriageResult({

priority,

action

});


};






// AI Workflow

const startAIWorkflow=()=>{


const steps=[


"🚨 Emergency Request Received",

"🧠 Triage Agent Checked Priority",

"💊 Inventory Agent Checked Medicine",

"❄️ Cold Chain Agent Verified Storage",

"🗺️ Logistics Agent Selected Route",

"🚑 Ambulance Dispatched",

"🏥 Patient Reached"


];



setTimeline([]);




steps.forEach((step,index)=>{


setTimeout(()=>{


setTimeline(prev=>[

...prev,

step

]);


},index*2000);



});


};
return (

<div className="container">


<EmergencyButton 
onEmergency={handleEmergency}
/>



<h1>
🚑 MediRoute Healthcare System
</h1>





{/* AI STATUS */}

<div className="card">

<h2>
🤖 AI Status
</h2>

<p>
🟢 All Agents Active
</p>

</div>






{/* TRIAGE */}

<div className="section">

<h2>
🧠 AI Triage Agent
</h2>


<div className="card">


<button

onClick={()=>runTriageAgent(
[
"Chest Pain",
"Breathing Difficulty"
]
)}

>

Analyze Emergency

</button>



{

triageResult &&

<>

<p>
🚨 Priority: {triageResult.priority}
</p>

<p>
🤖 Decision: {triageResult.action}
</p>

</>

}


</div>

</div>







{/* COMMAND CENTER */}

<div className="section">

<h2>
🚨 Emergency Command Center
</h2>


<div className="agent-grid">


<div className="agent-card">

<h3>
🚨 Critical Patients
</h3>

<h1>
{criticalPatients}
</h1>

<p>
Immediate Attention
</p>

</div>



<div className="agent-card">

<h3>
🚑 Ambulances
</h3>

<h1>
{activeAmbulances}
</h1>

<p>
Operating
</p>

</div>



<div className="agent-card">

<h3>
⏱️ Response Time
</h3>

<h1>
{responseTime} min
</h1>

<p>
AI Optimized
</p>

</div>



<div className="agent-card">

<h3>
💊 Medicine Alerts
</h3>

<h1>
{medicineAlerts}
</h1>

<p>
Monitoring
</p>

</div>


</div>

</div>








{/* GPS */}

<div className="section">

<h2>
📍 Live GPS Location
</h2>


<div className="card">


<button onClick={getLocation}>

Get My Location

</button>



{

location &&

<>

<p>
Latitude: {location.latitude}
</p>


<p>
Longitude: {location.longitude}
</p>


</>

}


</div>

</div>







{/* NEARBY HOSPITALS */}

<div className="section">

<h2>
🏥 Nearby Hospitals
</h2>


<div className="card">


{

nearbyHospitals.map((hospital,index)=>(


<div key={index}>


<h3>
🏥 {hospital.name}
</h3>


<p>
📏 Distance: {hospital.distance} km
</p>


<p>
🟢 Available
</p>


<hr/>


</div>


))


}


</div>


</div>








{/* HOSPITAL CAPACITY */}

<div className="section">

<h2>
🏥 Hospital Capacity Agent
</h2>


<div className="card">


{

selectedHospitalData &&

<>

<h3>
{selectedHospitalData.name}
</h3>


<p>
🛏 Beds: {selectedHospitalData.beds}
</p>


<p>
❤️ ICU: {selectedHospitalData.icu}
</p>


<p>
👨‍⚕️ Doctors: {selectedHospitalData.doctors}
</p>


</>

}



</div>

</div>
{/* AI AGENT DASHBOARD */}

<div className="section">

<h2>
🏥 Logistics Agent Decision
</h2>


<div className="card">


{

nearestHospital &&

<>

<h3>
{nearestHospital.name}
</h3>


<p>
📏 Distance: {nearestHospital.distance} km
</p>


<p>
🤖 Nearest Hospital Selected
</p>


</>

}


</div>


</div>







{/* MAP */}

<div className="section">

<h2>
🗺️ AI Ambulance Route Map
</h2>


<LiveMap

location={location}

hospital={nearestHospital}

/>


</div>








{/* AVAILABLE AMBULANCES */}

<div className="section">

<h2>
🚑 Available Ambulances
</h2>


<div className="card">


{

ambulances.map((ambulance)=>(


<div key={ambulance.id}>


<h3>
🚑 {ambulance.vehicle}
</h3>


<p>
👨‍✈️ Driver: {ambulance.driver}
</p>


<p>
Status: {ambulance.status}
</p>


<hr/>


</div>


))


}


</div>


</div>








{/* AMBULANCE TRACKING */}

<div className="section">


<h2>
🚑 Ambulance Tracking
</h2>


<div className="card">


<p>
Status: {ambulanceStatus}
</p>


<p>
⏱️ ETA: {eta} Minutes
</p>


<button onClick={startDelivery}>

Start Ambulance

</button>


</div>


</div>









{/* MEDICINE */}

<div className="section">

<h2>
💊 Medicine Stock Details
</h2>


<table>


<thead>

<tr>

<th>
Medicine
</th>

<th>
Quantity
</th>

<th>
Minimum
</th>

<th>
Expiry
</th>

<th>
Status
</th>

</tr>

</thead>



<tbody>


{

medicines.map((medicine,index)=>(


<tr key={index}>


<td>
{medicine.name}
</td>


<td>
{medicine.quantity}
</td>


<td>
{medicine.minimum}
</td>


<td>
{medicine.expiry}
</td>



<td>

{

medicine.quantity <= medicine.minimum

?

"🔴 Low Stock"

:

"🟢 Available"

}


</td>


</tr>


))


}


</tbody>


</table>


</div>









{/* AI AGENT DASHBOARD */}

<div className="section">

<h2>
🤖 AI Agent Dashboard
</h2>


<div className="agent-grid">


<div className="agent-card">

<h3>
🚨 Triage Agent
</h3>

<p>
🟢 Active
</p>

</div>



<div className="agent-card">

<h3>
💊 Inventory Agent
</h3>

<p>
🟢 Active
</p>

</div>



<div className="agent-card">

<h3>
❄️ Cold Chain Agent
</h3>

<p>
🟢 Active
</p>

</div>



<div className="agent-card">

<h3>
🗺️ Logistics Agent
</h3>

<p>
🟢 Active
</p>

</div>


</div>


</div>







<Analytics />









{/* AI TIMELINE */}

<div className="section">


<h2>
🤖 AI Decision Timeline
</h2>


<div className="card">


<button onClick={startAIWorkflow}>

Start AI Workflow

</button>



{

timeline.map((step,index)=>(


<p key={index}>

{step}

</p>


))


}


</div>


</div>





</div>

);


}


export default App;