import React from "react";
import './Rank.css'


const Rank=({name,entries})=>{
    return(
        <div className="">
            <div className="aa f3">
            {`${name} ,  your current entry is`} 
            </div>
            <div  className="ab f2">
            {entries}
            </div>
            </div>

      
    )
}
export default Rank