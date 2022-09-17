import React, { useState } from 'react'
import { Timechart } from '../API'
import { useEffect } from 'react'
import { PureComponent } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const Chart = (props) => {

const [chart, setChart] = useState({})

console.log(props.stock)

// const data =chart['Time Series (5min)'];

// const array=[];

// Object.keys(data).forEach((key)=>{
//     array.push({
//     date: key,
//     about: data[key]
//     })
// })

//  console.log(array)

// let stockChartxaxis= [];
// let stockChartyaixs= [];

useEffect(()=>{
    const fetchdata = async() =>{
        await fetch(Timechart(props.stock))
        .then((response) => response.json())
        .then((data) => setChart(data));
    }
    fetchdata()
    },[])

const data = chart;
const data1 = data['Time Series (Daily)'] || {};
console.log(data1)

const array = [];

Object.keys(data1).forEach((key)=>{
    array.push({
    'date': key,
    'open': data1[key]['1. open'],
    })
})

array.reverse();
console.log(array)

// for(var key in chart['Time Series (5min)']){
//     stockChartxaxis.push(key);
//     stockChartyaixs.push(chart['Time Series (5min)'][key]['1. open'])
// }

// console.log(stockChartxaxis)
// console.log(stockChartyaixs)



    
  return (
    <>
     {/* <ResponsiveContainer width="100%" height="100%"> */}
        <AreaChart
          width={500}
          height={400}
          data={array}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="open" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      {/* </ResponsiveContainer> */}
    </>
    
)
}

export default Chart
