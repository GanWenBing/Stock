import React from 'react'
import { Autosearch } from '../API'
import { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Chart from './Chart';
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Timechart } from '../API';


const StockPage = () => {
  const [stock, setStock] = useState('AAPL');
  const[info , setInfo] = useState({})
 

  const loadData = async()=>{
    await fetch(Autosearch(stock))
        .then((response) => response.json())
        .then((data) => {setInfo(data)});
  }

  useEffect(()=>{
    loadData();
  },[])

  const handleClick = (event) =>{
    event.preventDefault();
    loadData();
    //setStock(word)
  }

  const handleChange = (event) =>{
    const word = event.target.value;
    //console.log(word)
    setStock(word)
  }


  return (
    <>
    {/* <input name="title" type="search" onChange={handleChange}/>
    <button onClick = {handleClick}>search</button> */}
    <InputGroup className="col-6" onChange={handleChange}>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2" onClick = {handleClick}>
            Search
          </Button>
    </InputGroup>
    <ListGroup>
      <ListGroup.Item>Name: {info.Name}</ListGroup.Item>
      <ListGroup.Item>Symbol: {info.Symbol}</ListGroup.Item>
      <ListGroup.Item>Description: {info.Description}</ListGroup.Item>
      {/* <ListGroup.Item>Country: {info.Country}</ListGroup.Item>
      <ListGroup.Item>Industry: {info.Industry}</ListGroup.Item> */}
      {/* <ListGroup.Item>MarketCapitalization: {info.MarketCapitalization}</ListGroup.Item>
      <ListGroup.Item>Beta: {info.Beta}</ListGroup.Item>
      <ListGroup.Item>Highest Price: {info["52WeekHigh"]}</ListGroup.Item>
      <ListGroup.Item>Lowest Price: {info["52WeekLow"]}</ListGroup.Item>
      <ListGroup.Item>Average: {info["50DayMovingAverage"]}</ListGroup.Item> */}
    </ListGroup>
    <Chart stock={stock}/>
    {/* <h2>Name: {info.Name}</h2>
    <h2>Symbol: {info.Symbol}</h2>
    <h4>Description: {info.Description}</h4>
    <h4>Country: {info.Country}</h4>
    <h4>Industry: {info.Industry}</h4>
    <h4>MarketCapitalization: {info.MarketCapitalization}</h4>
    <h4>Beta: {info.Beta}</h4>
    <h4>Highest Price: {info["52WeekHigh"]}</h4>
    <h4>Lowest Price: {info["52WeekLow"]}</h4>
    <h4>Average: {info["50DayMovingAverage"]}</h4> */}
        
    
    </>
    
  )
}         

export default StockPage
