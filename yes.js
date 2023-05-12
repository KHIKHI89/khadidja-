import React, { useEffect , useState } from "react";

import * as echarts from "echarts";

export default function Graphy  (props)  {
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

  useEffect(() => {
    var myChart = echarts.init(document.getElementById("graph"));
    myChart.setOption({
        
            title:{
        
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              data: [""],
              itemGap: 4
            },
              toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
           },
            grid: {
              top: '12%',
              left: '1%',
              right: '10%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: xData
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Budget (million USD)',
                    axisLabel: {
                  formatter: function (a) {
                    a = +a;
                    return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
                  }
                }
              }
            ],
            dataZoom: [
              {
                type: 'slider',
                show: true,
                start: 94,
                end: 100,
                handleSize: 8
              },
              {
                type: 'inside',
                start: 94,
                end: 100
              },
              {
                type: 'slider',
                show: true,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 12,
                height: '70%',
                handleSize: 8,
                showDataShadow: false,
                left: '93%'
              }
            ],
            series: [
              {
                name: 'Budget 2011',
                type: 'line',
                data: yData
              },
              {
                name: 'Budget 2012',
                type: 'line',
                data: yData
              }
            ]
          
            
    });
   
    
  }, [xData]);

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

           <div
      id="graph"
      style={{
        width: "100%",
        height: 500,
        border: "1px solid red"
      }}
    /> 

    </div>
 
  );
};
