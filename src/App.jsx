import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import { useState } from 'react'
import Homepage from './Pages/Homepage'
import StockPage from './Pages/StockPage'
import MarketLayout from './Nav/MarketLayout'
import Favourite from './Pages/Favourite'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Slide from './Pages/Slide'






function App() {
  
  const [list, setList] = useState(['AAPL', 'TSLA', 'GOOG' ])
  

  const RemoveFromList = (index) => {
    const Arr = list.filter( (d,i) => i !== index )
    setList(Arr)
    
  }


  return (
    
    <>
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element = {<MarketLayout/>}/>
          <Route index element = {<Homepage/>}/>
          <Route path='/Fav'  element = {<Favourite list={list} handclick={RemoveFromList}/>} />
          <Route path='/stock' element = {<StockPage list={list} />}/>
          {/* <Route path='/Input' element = {<Slide/>}/> */}

        </Routes>

      </div>
    </BrowserRouter>
    </>

  )
}

export default App
