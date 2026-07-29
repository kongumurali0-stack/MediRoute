import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";


function Analytics(){


const emergencyData=[

{
name:"Critical",
value:5
},

{
name:"Medium",
value:12
},

{
name:"Low",
value:20
}

];



const medicineData=[

{
name:"Oxygen",
stock:20
},

{
name:"Vaccines",
stock:50
},

{
name:"Paracetamol",
stock:100
}

];



return(

<div className="section">


<h2>
📊 AI Analytics Dashboard
</h2>


<div className="card">


<h3>
🚨 Emergency Priority Analysis
</h3>


<PieChart width={300} height={250}>

<Pie

data={emergencyData}

dataKey="value"

nameKey="name"

outerRadius={80}

>

{

emergencyData.map((entry,index)=>(

<Cell key={index}/>

))

}

</Pie>


</PieChart>


</div>





<div className="card">


<h3>
💊 Medicine Stock Analysis
</h3>


<BarChart

width={400}

height={250}

data={medicineData}

>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="stock"/>


</BarChart>


</div>


</div>


);


}


export default Analytics;