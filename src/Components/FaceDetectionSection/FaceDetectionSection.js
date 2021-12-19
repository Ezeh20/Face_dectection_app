import React from "react";
import './FaceDetectionSection.css';


const FaceDectionSection=({imgUrl, box})=>{
    return (
        <div className="center ma">
        <div className="absolute mt4">
            <img  id='image' src={imgUrl} width='400px' height='auto'/>
            <div className="bounding" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
        </div>
        </div>
    )

}
export default FaceDectionSection