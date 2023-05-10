import React , {useState} from 'react';
import ReactDOM from "react-dom";
import ReactEcharts from "echarts-for-react";

import './App.css';

const App = (props) => {
    const data = props.data
    const schema = props.schema
    
  function Validation (schema)  {
    const x = []
    const y = []
   const Schema = schema.columns
   Object.values(Schema).map((item) => 
   {
   
    if (item.type === 'string')
    {
        x.push(item.label)

    }
    else if( item.type === 'date')
    {
        x.push(item.label)
    }
    else if (item.type === 'numeric')
    {
        y.push(item.label)
    }
   }
   )
   const data = {x , y }
   return data
}
const [x , setX] = useState("")
const [y, setY] = useState("")
const [xData, setXData] = useState([])
const [yData, setYData] = useState(data.map((item) => item.internalGlobalAmount))
console.log(yData)
const handledataX = (e) => {
  const value = e.target.value
   setXData(data.map((item) => item[value]))
   
}
/*const handledataY = (e) => {
  const value = "internalGlobalAmount"
  setYData(data.map((item) => item[value]))
}*/




const labelOption = {
    show: true,
    formatter: "",
    fontSize: 16,
    rich: {
      name: {
        textBorderColor: "#fff"
      }
    }
  };
  
  const option = {
    // tooltip, de préférence qu'il sera définit par défaut
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
        
    toolbox: {
        show: true,
        orient:'horizontal',
        padding: {
          top: 0,
          left: 0,
          right: "100%",
          bottom: 100
        },
        feature: {
          mark: { show: true },
          magicType: { show: true, type: ["line", "pie", "stack", "tiled"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
    legend: {
      data: xData.map((item)=> item)
    },
    // emplacement des charts
    grid: [
        { left: '7%', top: '7%', width: '38%', height: '38%' },
        { right: '7%', top: '7%', width: '38%', height: '38%' },
        { left: '7%', bottom: '7%', width: '38%', height: '38%' },
        { right: '7%', bottom: '7%', width: '38%', height: '38%' }
      ],
  
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: xData,
        
      }
    ],
    yAxis: [
      {
        type: "value",
        
      }
    ],
    series: [
      {
        name: "",
        type: "line",
        barGap: 0, 
        xAxisIndex: 0,
        yAxisIndex: 0,
        

        label: labelOption,
        data: yData
      },
      {
        name: "",
        type: "bar",
        label: labelOption,
        data: yData
      },
      {
        name: "",
        type: "bar",
        label: labelOption,
        data: yData
      },
      {
        name: "",
        type: "line",
        label: labelOption,
        data: yData
      }
    ]
  };




  return (
    <div> 
      <div>
      <select name="X" value={x} onChange={e=>handledataX(e)}>
        {Validation(schema).x.map((item) => 
          <option>{item}</option>
        )}
      </select>
      </div>
      <div>
      <select name="" value={y} >
        {Validation(schema).y.map((item) => 
          <option>{item}</option>
        )}
      </select>
      </div>
      <div>
        {xData.length !== 0 ? (
      < ReactEcharts
        option={option}
        style={{ height: "600px", width: "100%", marginBottom: "20px" }} 
      />): null}
      
     
      </div>


    </div>
    

      
     
      

    
  )
}

export default App;
