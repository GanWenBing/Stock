import React from 'react'
import { useState, useEffect, useMemo} from 'react'
import { Endpoint } from '../API'
import { AutoComplete, Button, Input } from "antd";
import ListGroup from 'react-bootstrap/ListGroup';
import Chart from './Chart';
import "antd/dist/antd.css";
import { Autosearch } from '../API';
import { Timechart } from '../API';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import debounce from 'lodash.debounce';
import Chartcandle from './Chartcandle';


export default class StockPage extends React.Component {
    constructor(props){
        super(props);
        //console.log(props)
        this.state = {
            search: "",
            dataSource: [],
            info: {
                Name:'',
                Symbol:'',
                Description:'',
                Country:'',
                Industry:'',
                MarketCapitalization:'',
                Beta:'',
                '52WeekHigh':'',
                '52WeekLow':'',
                '200DayMovingAverage':''
            },
            chart:{},
            list:props.list,
            loading:true,
            charttype:'',
            button:'Favourite'                      
    }
    
    
  };

    render() {
        // const clearState = () => {
        //     this.setState({ dataSource: [] });
        // };

        const getTickerFromAPi = debounce((e) => {
          // this.setState({loading:true})
          fetch(Endpoint(e))
              .then((response) => response.json())
              .then((data) => {
                  
                  const ArraysofData = data.bestMatches.map(f => [f['1. symbol'] + "," + f['2. name']])
                  // console.log(ArraysofData)
                  const FlatArray = [].concat(...ArraysofData);
                  console.log(FlatArray)
                  this.setState({ dataSource: FlatArray });
              })
      },500);

        

        const loadData = async (e) => {
            await fetch(Autosearch(e))
              .then((response) => response.json())
              .then((data) => {
                this.setState({
                  loading:false,
                  info:{Name: data.Name,
                        Symbol: data.Symbol,
                        Description: data.Description,
                        Country: data.Country,
                        Industry: data.Industry,
                        MarketCapitalization: data.MarketCapitalization,
                        Beta: data.Beta,
                        '52WeekHigh': data["52WeekHigh"],
                        '52WeekLow': data["52WeekLow"],
                        '200DayMovingAverage': data["200DayMovingAverage"]}})
              });
              
          }

       

        const fetchData = async (e) => {
          this.setState({loading:true});
            await fetch(Timechart(e))
              .then((response) => response.json())
              .then((data) => {
                //console.log(data)
                this.setState({chart:data})
              });
          }
        
        const handleAddtoList = () =>{
          //console.log(!this.state.list.includes(this.state.search.split(',')[0]))
          
            if(this.state.search.split(',')[0]===this.state.info.Symbol&&!this.state.list.includes(this.state.search.split(',')[0])){
              this.state.list[this.state.list.length]=this.state.info.Symbol;
              this.setState({button:'In your Watchlist'})
            }
            // this.state.list[this.state.list.length]=this.state.search.split(',')[0];
            console.log(this.state.list)           
         }
         console.log(this.state.list)
          
         
    const handleSearch = e => {
      if (e) {
        console.log(e)
        this.setState({ search: e }, () => getTickerFromAPi(e));
        this.setState({ search: e }, () => fetchData(e.split(',')[0]))
      } 
      else {
        this.setState({ search: e });
      }
    };

    const handleSearchClick = (e) =>{
      loadData(e.split(',')[0])
    }
    

    //console.log(this.state.list)

    function numFormatter(num) {
      if(num > 999 && num < 1000000){
          return (num/1000).toFixed(2) + 'K'; 
      }else if(num > 1000000 && num < 1000000000){
          return (num/1000000).toFixed(2) + 'M'; 
      }else if(num > 1000000000 && num< 1000000000000){
          return(num/1000000000).toFixed(2) + 'B';
      }else if(num > 1000000000000 && num < 1000000000000000){
        return(num/1000000000000).toFixed(2) + 'T';
      }else if(num > 1000000000000000){
        return (num/1000000000000000).toFixed(2) + 'Q';
      }else if(num < 900){
          return num; 
      }
      }
    
    const handleLineChart = () =>{
      this.setState({
        charttype:
          <Chart stock={this.state.chart} /> 
      })
    }

    const handleCandleStick = () =>{
      this.setState({
        charttype:
          <Chartcandle stock={this.state.chart}/>
      })
    }

    return (
    <>
      <div className='searchbar'>
        <h4>Stock market symbols,names</h4>       
        <AutoComplete
          style={{ width: "90%" }}
          className="d"
          value={this.state.search}
          option={this.state.dataSource}
          onChange={handleSearch}
          onSelect={handleSearchClick}
          dataSource={this.state.dataSource}
          placeholder='Type market stock symbol or name'
          
        /> 
        {!this.state.search.includes(',')?<div></div>:(this.state.list.includes(this.state.search.split(',')[0])&&this.state.search.split(',')[0]===this.state.info.Symbol)?
        <Button type='text' style={{backgroundColor:'white'}}>In Your Watchlist</Button>:<Button onClick={handleAddtoList} >{this.state.button}</Button>}
      </div>
      {/* this.state.search.split(',')[0] */}
        {this.state.loading?(
                  <div></div>
                ):(
                  <>
                  <ListGroup>
                  <ListGroup.Item style={{fontSize:'1.5rem'}}>Overview</ListGroup.Item>
                  <ListGroup.Item>Name: {this.state.info.Name}</ListGroup.Item>
                  <ListGroup.Item>Symbol: {this.state.info.Symbol}</ListGroup.Item>
                  <ListGroup.Item>Description: {this.state.info.Description}</ListGroup.Item>
                  <ListGroup.Item>Country: {this.state.info.Country}</ListGroup.Item>
                  <ListGroup.Item>Industry: {this.state.info.Industry}</ListGroup.Item>
                  <ListGroup.Item>MarketCapitalization: $ {numFormatter(this.state.info.MarketCapitalization)}</ListGroup.Item>
                  {/* <ListGroup.Item>Beta: {this.state.info.Beta}</ListGroup.Item> */}
                  <ListGroup.Item>Highest Price: $ {this.state.info["52WeekHigh"]}</ListGroup.Item>
                  <ListGroup.Item>Lowest Price: $ {this.state.info["52WeekLow"]}</ListGroup.Item>
                  <ListGroup.Item>Average: $ {this.state.info["200DayMovingAverage"]}</ListGroup.Item>
                  </ListGroup>
                  <br></br>
                  <Button onClick={handleLineChart}>Line Chart</Button>{' '}
                  <Button onClick={handleCandleStick}>CandleStick</Button>
                  <div>
                    {this.state.charttype}
                  </div>
                  {/* <Chart stock={this.state.chart} /> */}
                  </>
                  )}
        
    </>
    );
  }
}


