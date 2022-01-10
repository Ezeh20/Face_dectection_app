import React from "react";
import './Navigation.css';

const Navigation=({onRouteChange, isSignedIn})=>{
    if(isSignedIn){
        return(
        <div className="display lh-copy">
        <p className="ma3 pa3 link f3 blue underline dim pointer media" onClick={()=> onRouteChange('signin')}>Sign Out</p>
        </div>
        )
    }else{
        return(
        <div className="display lh-copy">
        <p className="ma3 pa3 link f3 blue underline dim pointer media" onClick={()=> onRouteChange('signin')}>Sign In</p>
        <p className="ma3 pa3 link f3 blue underline dim pointer media" onClick={()=> onRouteChange('register')}>Register</p>
        </div>
        )
    }
}
export default Navigation