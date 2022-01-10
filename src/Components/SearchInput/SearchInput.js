import React from "react";
import './SearchInput.css'


const SearchInput=({onSearchChange , onClickChange})=>{
    return(
        <div className="">
            <p className="aa white f3">
                {'Input your image url link below and the face in the image will be detected'}
            </p>
            <div className="center">
                <div className="form yy center pa4 br3 shadow-5">
                <input type="text" className=" center f4 pa2 w-70 bz" onChange={onSearchChange}/>
                <button className="w-30 dib grow bg-light-blue f3 bb" onClick={onClickChange}>Detect</button> 
                </div>
            </div>
        </div>
    )
}
export default SearchInput