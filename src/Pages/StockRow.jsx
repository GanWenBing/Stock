import React from 'react'
import { Timechart } from '../API';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineMinusCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";


export default class StockRow extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            list:props,
        }
        //console.log(props)
        this.list = [];
        //console.log(props)

    }

    componentDidMount() {
        // console.log(this.state.list.stock)
        // this.state.list.stock((d)=><h6>{d}</h6>)
        //API 
        let stockLowestPrice = []
        let stockHighestPrice = [];
        let stockOpenPrice = [];
        let stockClosedPrice = [];
        let date = [];
        // console.log(Timechart(this.props.ticker))
        fetch(Timechart(this.props.ticker))
            .then((response) => response.json())
            .then((data) => {
                for (var key in data['Time Series (Daily)']) {
                    date.push(key)
                    stockOpenPrice.push(data['Time Series (Daily)'][key]['1. open']);
                    stockHighestPrice.push(data['Time Series (Daily)'][key]['2. high']);
                    stockLowestPrice.push(data['Time Series (Daily)'][key]['3. low']);
                    stockClosedPrice.push(data['Time Series (Daily)'][key]['4. close']);
                }
                //console.log(stockOpenPrice)
                const diffValues = ((stockClosedPrice[0] - stockOpenPrice[0]) / stockOpenPrice[0] * 100)
                this.setState({
                    Highest: Number(stockHighestPrice[0]).toFixed(2),
                    Lowest: Number(stockLowestPrice[0]).toFixed(2),
                    Open: Number(stockOpenPrice[0]).toFixed(2),
                    Close: Number(stockClosedPrice[0]).toFixed(2),
                    Difference: Number(diffValues).toFixed(2)

                })
            });


    }
    


    render() {


        return (
            
              <tr className='stockfontsize'>
                 <td>{this.props.ticker}</td>
                 <td>{this.state.Highest}</td>
                 <td>{this.state.Lowest}</td>
                 <td>{this.state.Open}</td>
                 <td>{this.state.Close}</td>
                 <td>{this.state.Difference >= 0 ? (<IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                     {this.state.Difference}%
                         <AiOutlineArrowUp />
                     </IconContext.Provider>) : (<IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                     {this.state.Difference}%
                         <AiOutlineArrowDown />
                     </IconContext.Provider>)}
                 </td>
                 <td onClick={()=>this.state.list.handclick(this.state.list.index)} ><AiOutlineMinusCircle className='removeButton'/></td>
             </tr>
            

        )
    }

}

// {this.state.list.stock.map((item,index)=><tbody>
            // <tr>
            //     <td>{this.props.ticker}</td>
            //     <td>{this.state.Highest}</td>
            //     <td>{this.state.Lowest}</td>
            //     <td>{this.state.Open}</td>
            //     <td>{this.state.Close}</td>
            //     <td>{this.state.Difference > 0 ? (<IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
            //         {this.state.Difference}%
            //             <AiOutlineArrowUp />
            //         </IconContext.Provider>) : (<IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
            //         {this.state.Difference}%
            //             <AiOutlineArrowDown />
            //         </IconContext.Provider>)}
            //     </td>
            //     <td onClick={()=>this.state.list.handclick(this.state.list.ticker)} ><AiOutlineMinusCircle/></td>
            // </tr>
            // </tbody>)}


