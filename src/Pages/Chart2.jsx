import React, { useState } from 'react'
import { Timechart } from '../API'
import { useEffect } from 'react'
import { PureComponent } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Plot from 'react-plotly.js';


export default class Chart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stockChartXValues: [],
          stockChartYValues: []
        }
      }
    
  
      componentDidMount(prevProps) {
        //const [prevProps, setPrevProps] = useState('')
        if(this.props !== prevProps){ //<---- see here
            
                this.fetchStock(this.props)
                console.log(this.props)
            // useEffect(()=>{
            //     this.fetchStock()
            // })//<---- see here
         }
      }
    
  
    fetchStock(e) {
        const pointerToThis = this;
        console.log(pointerToThis);
        let StockSymbol = e.stock;
        console.log(StockSymbol)
        let API_Call = Timechart(StockSymbol)
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        
        fetch(API_Call)
        .then(
          function(response) {
            return response.json();
          }
        )
        .then(
          function(data) {
            console.log(data);


            for (var key in data['Time Series (Daily)']) {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
              }
              pointerToThis.setState({
                stockChartXValues: stockChartXValuesFunction,
                stockChartYValues: stockChartYValuesFunction
              });
            }
          )
      
    }

    
  
    render() {
        
      return (
        <>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
        </>
      )
    }
  }

  //export default Chart2