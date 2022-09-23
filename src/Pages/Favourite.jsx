import Table from 'react-bootstrap/Table';
import React from 'react'
import StockRow from './StockRow';
import Spinner from 'react-bootstrap/Spinner';


const Favourite = (props) => {
  //console.log(props)


  return (<main>
    <div className='stockWatchlist'>     
      My Stock Watchlist
      </div>
      <div>
      <Table striped bordered hover size="sm">
      <thead className='tableCustom'>
        <tr>
          <th>Symbol</th>
          <th>Highest Price/$</th>
          <th>Lowest Price/$</th>
          <th>Open Price/$</th>
          <th>Close Price/$</th>
          <th>increase/Decrease</th>
          <th>Remove From Watchlist</th>
        </tr>
      </thead>
      {props.list.map((item,index)=><tbody>
        <StockRow stock={props.list} ticker={item} index={index} key={props.list} handclick={props.handclick}/>
      </tbody>)}
      </Table> 
    </div>
  </main>
    
  )
  
}


export default Favourite
