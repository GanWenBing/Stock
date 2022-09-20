import React from 'react'
import Plot from 'react-plotly.js';

const Chartcandle = (props) => {
    const stockChartXValues = [];
    const stockChartOpenValues= [];
    const stockChartClosedValues= [];
    const stockChartLowValues= [];
    const stockChartHighValues= [];
    for (var key in props.stock['Time Series (Daily)']) {
        stockChartXValues.push(key);
        stockChartOpenValues.push(props.stock['Time Series (Daily)'][key]['1. open']);
        stockChartHighValues.push(props.stock['Time Series (Daily)'][key]['2. high']);
        stockChartLowValues.push(props.stock['Time Series (Daily)'][key]['3. low']);
        stockChartClosedValues.push(props.stock['Time Series (Daily)'][key]['4. close'])

        var trace1 ={
            x:stockChartXValues.reverse(),
            close:stockChartClosedValues.reverse(),
            decreasing: {line: {color: '#7F7F7F'}},
            high:stockChartHighValues.reverse(),
            increasing: {line: {color: 'red'}},
            line: {color: 'rgba(31,119,180,1)'},
            low:stockChartLowValues.reverse(),
            open:stockChartOpenValues.reverse(),
            type: 'candlestick', 
            xaxis: 'x', 
            yaxis: 'y' 
        }
      }
    
    return (
        <>
          <Plot
          data = {[trace1]}
          layout = {{
            dragmode: 'zoom', 
            margin: {
              r: 10, 
              t: 25, 
              b: 40, 
              l: 60
            }, 
            showlegend: false, 
            xaxis: {
              autorange: true, 
              domain: [0, 1], 
              range: [trace1.x?.[0], trace1.x?.[trace1.x.length-1]], 
              rangeslider: {range: [trace1.x?.[0], trace1.x?.[trace1.x.length-1]]}, 
              title: 'Date', 
              type: 'date'
            }, 
            yaxis: {
              autorange: true, 
              domain: [0, 1], 
              range: [114.609999778, 137.410004222], 
              type: 'linear'
            }
          }
            }
          />
          </>
        
        
    )
}

export default Chartcandle
