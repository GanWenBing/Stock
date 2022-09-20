
import React, { useState } from 'react'
import Plot from 'react-plotly.js';

const Example = (props) => {
    const stockChartXValues = [];
    const stockChartYValues= [];
    //console.log(props)

    for (var key in props.stock['Time Series (Daily)']) {
        stockChartXValues.push(key);
        stockChartYValues.push(props.stock['Time Series (Daily)'][key]['1. open']);
      }

      
        return (
          <>
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              }
            ]}
            layout={{width: 720, height: 440, title: 'Stock Market'}}
          />
          </>
        )
      
}

export default Example
