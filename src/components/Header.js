import React from 'react'
import background from '../imgs/background.jpg';
import data from "../initial_setup.json";


const resturantName = data.RESTURANT_NAME;

export default function Header(props) {
  return (
    <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        position: "relative"
    }} className="jumbotron mt-4 text-center">
    <div style={{position: 'absolute', zIndex: '1', width: '100%', height: '100%', background: 'rgba(0,0,0,.65)', top: '0', left: '0'}}></div>
    <div style={{position: 'relative', zIndex: '2'}}>
     <h1>{resturantName}</h1>
     <h2>Total Collected: ${props.totalCollected}</h2>
     </div>
    </div>
  )
}
