import React from "react";
import Tilt from 'react-tilt'
import brain from './brain.png';
import './Logo.css';

const Logo=()=>{
    return(
        <div className="m4 aa mt0">
        <Tilt className="Tilt pa4 Logo bq shadow-5 ayo">
        <div className="Tilt-inner">
            <img className="Logo ayi" src={brain}/>
            </div>
       </Tilt>
       </div>
    )
}
export default Logo