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
function genData(data) {
  
  var legendData = [];
  var seriesData = [];
  var selected = {};
  for (var i = 0; i < data.length; i++) {
    const name =
      Math.random() > 0.65
        ? makeWord(4, 1) + "·" + makeWord(3, 0)
        : makeWord(2, 1);
    legendData.push(name);
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000)
    });
    selected[name] = i < 6;
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected
  };

  function makeWord(max, min) {
    var nameLen = Math.ceil(Math.random() * max + min);
    var name = [];
    for (var i = 0; i < nameLen; i++) {
      name.push(data[Math.round(Math.random() * data.length - 1)]);
    }
    return name.join("");
  }
}
var Data = genData(xData);
const PieToolbox = {
  feature: {
    saveAsImage: {
      name: "Chart",
      show: true,
      title: "Save as Image",
      // name: 'Share of Topics', // need to set dynamic
      type: "jpeg",
      backgroundColor: "#FFFFFF",
      pixelRatio: 2
    },
    dataView: {
      show: true,
      readOnly: true,
      title: "View Data",
      lang: ["View Data", "Close", "Refresh"]
    },
    restore: { show: true, title: "Restore" }
  }
};
console.log(genData(xData))
const pie = {
  tooltip: {
    show: true
  },
  toolbox: PieToolbox,
  legend: {
    type: "scroll",
    orient: "vertical",
    right: 1,
    left: 2,
    top: 20,
    bottom: 20,
    data: genData(xData).legendData,

    selected: genData(xData).selected
  },
  series: {
    type: "pie",
    data: genData(yData).seriesData,
    label: {
      position: "outer",
      alignTo: "none",
      bleedMargin: 5
    },
    top: "10%",
    bottom: "10%"
  }
  
};


const pieOptions = {
  title: {
    x: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    type: "scroll",
    orient: "horizontal",
    right: 1,
    left: 2,
    top: 20,
    bottom: 20,
    data: xData.map((item) => item),
    selected: xData.map((item) => item)
  },
  series: [
    {
      toolbox: {
        show: true,
        feature:{
          magicType:{
          
          }
        },
      },
      type: "pie",
      radius: "55%",
      center: ["30%", "50%"],
      data: [
          { value: 335, name: "Direct" },

            
        
        {name:xData.map((item) => item)}
    ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}







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
      option={pie}
      style={{ height: "600px", width: "100%", marginBottom: "20px" }} 
    />): null}

      </div>

   
     


    </div>
    

      
     
      

    
  )
}

export default App;
