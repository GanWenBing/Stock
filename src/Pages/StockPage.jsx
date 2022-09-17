import React from 'react'
import { useState, useEffect} from 'react'
import { Endpoint } from '../API'
import { AutoComplete,Button} from "antd";
import ListGroup from 'react-bootstrap/ListGroup';
import Chart from './Chart';
import "antd/dist/antd.css";
import { Autosearch } from '../API';
import { Timechart } from '../API';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';



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
            loading:false,

    }
    //console.log(this.state.list)
    
  };

    render() {
        const clearState = () => {
            this.setState({ dataSource: [] });
        };

        const getTickerFromAPi = async (e) => {
            await fetch(Endpoint(e))
                .then((response) => response.json())
                .then((data) => {
                    const ArraysofData = data.bestMatches.map(f => [f['1. symbol'] + "," + f['2. name']])
                    // console.log(ArraysofData)
                    const FlatArray = [].concat(...ArraysofData);
                    // console.log(FlatArray)
                    this.setState({ dataSource: FlatArray });
                })
        }

        const loadData = async (e) => {
          this.setState({loading:true});
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
            await fetch(Timechart(e))
              .then((response) => response.json())
              .then((data) => {
                //console.log(data)
                this.setState({chart:data})
              });
          }
        
        const handleAddtoList = () =>{
            // props.list[props.list.length]=e.split(',')[0]   ;
            
            console.log(this.state.search)
            console.log(this.state.list.length)
            this.state.list[this.state.list.length]=this.state.search.split(',')[0];
            console.log(this.state.list)
         }

        
          

    const handleSearch = e => {
      if (e) {
        // console.log(e)
        this.setState({ search: e }, () => getTickerFromAPi(e));
        this.setState({ search: e }, () => loadData(e.split(',')[0]))
        this.setState({ search: e }, () => fetchData(e.split(',')[0]))
      } 
      else {
        this.setState({ search: e });
      }
    };

    

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
          onSelect={clearState}
          dataSource={this.state.dataSource}
        //   placeholder="search Ticker"
        /> 
        {/* <Button>Search</Button>   */}
        <Button onClick={handleAddtoList} >Favourite</Button>
      </div>
      
        {this.state.loading?(
                  <tr>
                    <td rowSpan="4" colSpan="4">
                      <div className="text-center py-5">
                          <Spinner animation="border" />
                      </div>
                    </td>
                  </tr>
                ):(
                  <>
                  <ListGroup>
                  <ListGroup.Item style={{fontSize:'1.5rem'}}>Overview</ListGroup.Item>
                  <ListGroup.Item>Name: {this.state.info.Name}</ListGroup.Item>
                  <ListGroup.Item>Symbol: {this.state.info.Symbol}</ListGroup.Item>
                  <ListGroup.Item>Description: {this.state.info.Description}</ListGroup.Item>
                  <ListGroup.Item>Country: {this.state.info.Country}</ListGroup.Item>
                  <ListGroup.Item>Industry: {this.state.info.Industry}</ListGroup.Item>
                  <ListGroup.Item>MarketCapitalization: {this.state.info.MarketCapitalization}</ListGroup.Item>
                  <ListGroup.Item>Beta: {this.state.info.Beta}</ListGroup.Item>
                  <ListGroup.Item>Highest Price: ${this.state.info["52WeekHigh"]}</ListGroup.Item>
                  <ListGroup.Item>Lowest Price: ${this.state.info["52WeekLow"]}</ListGroup.Item>
                  <ListGroup.Item>Average: ${this.state.info["200DayMovingAverage"]}</ListGroup.Item>
                  </ListGroup>
                  {/* <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Chart type
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown> */}
                  <Chart stock={this.state.chart} />
                  </>
                  )}
        
    </>
    );
  }
}


{/* <ListGroup.Item style={{fontSize:'1.5rem'}}>Overview</ListGroup.Item>
        <ListGroup.Item>Name: {this.state.info.Name}</ListGroup.Item>
        <ListGroup.Item>Symbol: {this.state.info.Symbol}</ListGroup.Item>
        <ListGroup.Item>Description: {this.state.info.Description}</ListGroup.Item>
        <ListGroup.Item>Country: {this.state.info.Country}</ListGroup.Item>
        <ListGroup.Item>Industry: {this.state.info.Industry}</ListGroup.Item>
        <ListGroup.Item>MarketCapitalization: {this.state.info.MarketCapitalization}</ListGroup.Item>
        <ListGroup.Item>Beta: {this.state.info.Beta}</ListGroup.Item>
        <ListGroup.Item>Highest Price: ${this.state.info["52WeekHigh"]}</ListGroup.Item>
        <ListGroup.Item>Lowest Price: ${this.state.info["52WeekLow"]}</ListGroup.Item>
        <ListGroup.Item>Average: ${this.state.info["200DayMovingAverage"]}</ListGroup.Item>
        </ListGroup>
        <Chart stock={this.state.chart} /> */}
// const Inputsearch = () => {
//     const [search, setSearch] = useState('');
//     const [dataList, setDataList] = useState([]);
    
//     // const ArraysofData = [];

//     const searchData = async (e) => {
//         await fetch(Endpoint(e))
//           .then((response) => response.json())
//           .then((data) =>{
//             // setStock(data)
//             console.log(typeof(dataList))
//             console.log(data.bestMatches)
//             const ArraysofData = data.bestMatches.map(f => [f['1. symbol'] + " ," + f['2. name']])
//             console.log(ArraysofData)
//             const newData = [].concat(...ArraysofData)
//             console.log(typeof(ArraysofData))
//             setDataList(ArraysofData)
//             console.log(typeof(setDataList(ArraysofData)))
//         }
//         );
//       }

//     useEffect(()=>{
//         searchData()
//     },[]);

//     // const clearState = () =>{
//     //     setDataList([])
//     // }

//     const handleType = (event) =>{
        
//         if(event){
//         // searchData(stock)
//         // const word = event.target.value; 
//         // console.log(word)
//         setSearch(event)
//         searchData(event)

//         // setStock(word)
//         // searchData(event)
//     }
//         else{
//             // setStock('')
//             console.log('hello')
//             setSearch(event)
//             // setDataList([])
//             // console.log(setDataList())
//         }
    
//     }

//     const handleClick = (event) =>{
//         event.preventDefault();

//     }

//   return (
//     <>
//             <div>
//             <AutoComplete
//             style={{
//                 width: '90%',
//             }}
//             value={search}
//             onChange={handleType}
//             dataSource={dataList}
//             />
//             </div>
            
//             {/* <Button></Button> */}

//             {/* <AutoComplete
//             onChange={handleType}
//             data={dataList}
//   /> */}
//             {/* <form>
//             <input onChange={handleType} 
//             // onSelect={clearState}
//             ></input>
//             <h2>{dataList}</h2>
//           ` <button onClick={handleClick}>Enter </button>
//             </form> */}
//     </>
//   )
// }

// export default Inputsearch



// const Inputsearch = () => {
//     const [search, setSearch] = useState('AAPL');
//     const [dataList, setDataList] = useState([]);

    

//     // const ArraysofData = [];

//     const searchData = async (e) => {
//         await fetch(Endpoint(e))
//           .then((response) => response.json())
//           .then((data) =>{
//             // setStock(data)
//             console.log(data)
//             console.log(data.bestMatches)
//             const ArraysofData = data.bestMatches.map(f => [f['1. symbol'] + " ," + f['2. name']])
//             console.log(ArraysofData)
//             const newData = [].concat(ArraysofData)
//             console.log(newData)
//             setDataList(ArraysofData)
//         }
//         );
//       }

//     useEffect(()=>{
//         searchData()
//     },[]);

//     // const clearState = () =>{
//     //     setDataList([])
//     // }

//     const handleType = (event) =>{
        
//         if(event){
//         console.log('call')
//         // searchData(stock)
//         const word = event.target.value; 
//         console.log(word)
//         search
//         searchData(word)
//         // setStock(word)
//         // searchData(event)
//     }
//         else{
//             // setStock('')
//             console.log('hello')
//             setDataList([])
//             // console.log(setDataList())
//         }
    
//     }

//     const handleClick = (event) =>{
//         event.preventDefault();

//     }

//   return (
//     <>
//             {/* <div>
//             <AutoComplete
//             style={{
//                 width: '90%',
//             }}
//             onChange={handleType}
//             value={stock}
//             dataSource={dataList}
//             />
//             </div> */}
            
//             {/* <Button></Button> */}

//             {/* <AutoComplete
//             onChange={handleType}
//             data={dataList}
//   /> */}
//             <form>
//             <input onChange={handleType} 
//             // onSelect={clearState}
//             ></input>
//             <h2>{dataList}</h2>
//           {/* ` <button onClick={handleClick}>Enter </button> */}
//             </form>
//     </>
//   )
// }

// export default Inputsearch


// const Inputsearch = () => {

//     const [search, setSearch] = useState('AAPL')
//     const [type, setType] = useState([])

//     // const searchTerm = search.Params

//     console.log(search)

//     const fetchEndpoint = async () => 
//     {if(search.length>0){
//         await fetch(Endpoint(search))
//             .then((response) => response.json())
//             .then((data) =>  
//             {
//             setType([])    
//             console.log(data["bestMatches"])
//             data = data["bestMatches"]
//             console.log(data[1]["1. symbol"])
//             let searchQuery = search.toLowerCase();
//             console.log(searchQuery)
//             for(const key in data){
//                 let stockName = data[key]["1. symbol"].toLowerCase();
//                 if(stockName.slice(0,searchQuery.length).indexOf(searchQuery)!== -1){
//                     setType(prevResult =>{
//                     return[...prevResult, data[key]["1. symbol"]]
//                     })
//                 }
//                 // if(stockName.slice(0, searchQuery.length).indexof(searchQuery)!== -1){
//                 //     setType(prevResult =>{
//                 //         return[...prevResult, data[key]["1. symbol"]]
//                 //     }

//                 //     )
//                 // }
//             }
//             });
//          }else{
//             setType([])
//          }
//     }

//     useEffect(() => {
//         fetchEndpoint();
//     }, [])

//     const handleType = (event) =>{
//         const word = event.target.value;
//         setSearch(word)
//     }

//     // const handleClick = (event) =>[
//     //     event.preventDefault();
//     //     fetchEndpoint()
//     // ]
//     const handleClick = (event) =>{
//         event.preventDefault();
//         fetchEndpoint()
//     }

//     return (
//         <>
//         <div>
//             Hello
//         </div>
//         <form>
//         <input onChange={handleType}></input>
//         {
//             type.map((type, index) => <a key={index}>
//                 <div>
//                     {type}
//                 </div>
//             </a>)

            
//         }
//         <button onClick={handleClick}>Enter </button>
//         </form>
//         </> 
//     )
// }

// export default Inputsearch




// import React from 'react'
// import { Autosearch } from '../API'
// import { useState, useEffect } from "react";
// import ListGroup from 'react-bootstrap/ListGroup';
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";
// import Chart2 from './Chart2';
// import Chart from './Chart';
// import { Timechart } from '../API'
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import Example from './Example';


// const StockPage = (props) => {

//   console.log(props.list.length)
//   const [stock, setStock] = useState('AAPL');
//   const [info, setInfo] = useState({})
//   const [chart, setChart] = useState({})
//   //const[chart, setChart] = useState({})
//   // const [xaxis, setXaxis]= useState({})

//   // useEffect(()=>{
//   //   fetch(Timechart(stock))
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       const array=[];
//   //       const data1 = data['Time Series (Daily)'] || {};
//   //       Object.keys(data1).forEach((key)=>{
//   //       array.push({
//   //           'date': key,
//   //           'open': data1[key]['1. open'],
//   //           })
//   //       })
//   //       array.reverse()
//   //       console.log(array)
//   //       setXaxis(array)

//   //     });
//   //   },[]);



//   const loadData = async () => {
//     await fetch(Autosearch(stock))
//       .then((response) => response.json())
//       .then((data) => {
//         setInfo(data)
//       });
//   }

//   useEffect(() => {
//     loadData();

//   }, [])

//   const fetchData = async () => {
//     await fetch(Timechart(stock))
//       .then((response) => response.json())
//       .then((data) => { setChart(data) });
//   }

//   useEffect(() => {
//     fetchData();
//   }, [])

//   const handleClick = (event) => {
//     event.preventDefault();
//     loadData()
//     fetchData()

//     //setStock(word)
//   }

//   const handleChange = (event) => {
//     const word = event.target.value;
//     setStock(word)
//     //console.log(word)

//   }

//   const handleAddtoList = () =>{
//     props.list[props.list.length]=stock;
//     console.log(props.list)
//   }
  


//   // useEffect(()=>{
//   //   fetchdata();
//   // },[])

//   // fetchdata();
//   // console.log(array)



//   //console.log(array)
//   // useEffect(()=>{
//   //     const fetchdata = async() =>{
//   //         await fetch(Timechart(stock))
//   //         .then((response) => response.json())
//   //         .then((data) => {
//   //             const data1 = data['Time Series (Daily)'] || {};
//   //             Object.keys(data1).forEach((key)=>{
//   //             array.push({
//   //             'date': key,
//   //             'open': data1[key]['1. open'],
//   //             })
//   //         })
//   //         array.reverse();}
//   //         );
//   //     }
//   //     fetchdata()
//   //     },[]);


//   return (
//     <>
//       {/* <input name="title" type="search" onChange={handleChange}/>
//     <button onClick = {handleClick}>search</button> */}
//       <InputGroup className="col-6" onChange={handleChange}>
//         <FormControl
//           placeholder="Search"
//           aria-label="Search"
//           aria-describedby="basic-addon2"
//         />
//         <Button variant="outline-secondary" id="button-addon2" onClick={handleClick}>
//           Search
//         </Button>
//         <Button variant="outline-secondary" id="button-addon2" onClick={handleAddtoList}>
//           Add 
//         </Button>
//       </InputGroup>
//       <ListGroup>
//         <ListGroup.Item>Name: {info.Name}</ListGroup.Item>
//         <ListGroup.Item>Symbol: {info.Symbol}</ListGroup.Item>
//         <ListGroup.Item>Description: {info.Description}</ListGroup.Item>
//         {/* <ListGroup.Item>Country: {info.Country}</ListGroup.Item>
//       <ListGroup.Item>Industry: {info.Industry}</ListGroup.Item> */}
//         {/* <ListGroup.Item>MarketCapitalization: {info.MarketCapitalization}</ListGroup.Item>
//       <ListGroup.Item>Beta: {info.Beta}</ListGroup.Item>
//       <ListGroup.Item>Highest Price: {info["52WeekHigh"]}</ListGroup.Item>
//       <ListGroup.Item>Lowest Price: {info["52WeekLow"]}</ListGroup.Item>
//       <ListGroup.Item>Average: {info["50DayMovingAverage"]}</ListGroup.Item> */}
//       </ListGroup>
//       {/* <Chart2 stock={stock}/> */}
//       <Example stock={chart}/>

//       {/* <Chart stock={stock} /> */}
//       {/* <h2>Name: {info.Name}</h2>
//     <h2>Symbol: {info.Symbol}</h2>
//     <h4>Description: {info.Description}</h4>
//     <h4>Country: {info.Country}</h4>
//     <h4>Industry: {info.Industry}</h4>
//     <h4>MarketCapitalization: {info.MarketCapitalization}</h4>
//     <h4>Beta: {info.Beta}</h4>
//     <h4>Highest Price: {info["52WeekHigh"]}</h4>
//     <h4>Lowest Price: {info["52WeekLow"]}</h4>
//     <h4>Average: {info["50DayMovingAverage"]}</h4> */}




//     </>

//   )
// }

// export default StockPage
