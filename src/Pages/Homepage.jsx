import React from 'react'
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Newssentiment } from '../API';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Homepage = () => {

  const [news, SetNews] = useState([]);
  const [status, setStatus] = useState("idle");
  

  const fetchNewsData = async () => {
            setStatus("loading");
            await fetch(Newssentiment('AAPL'))
              .then((response) => response.json())
              .then((data) =>
                // console.log(data.feed)
              {
              setStatus("done");
              SetNews(data.feed);
              
              // const Arrayofnews = data.feed;
              // Arrayofnews.map((e)=>{console.log(e.title)})
              
           }
           )}
        
  useEffect(() =>{
    fetchNewsData();
  },[]);

  return (
    <>
     {status === "loading" ? 
     <div className='HomepageSpinner'>
      <Spinner animation="border" variant="dark"/>
     </div>:
    <div style={{backgroundColor:'black'}}>
    <Row xs={1} md={3} className="g-4">
      {news.map((e, index) => (
        <Col>
          <Card bg={'light'}>
            <Card.Img variant="top" src={e["banner_image"]} />
            <Card.Body>
              <Card.Title>{e.title}</Card.Title>
              <Card.Text>
                {e.summary}
              </Card.Text>
              <Button variant="primary" onClick={()=>window.open(e.url)}>Go </Button>
              {/* <Card.Link href={e.url}>Go</Card.Link> */}
              {/* <Button variant="primary" onClick={(e)=>{e.url
              console.log(e.url)}}>Go</Button> */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
}

    
    </>
  

  )
}

export default Homepage

