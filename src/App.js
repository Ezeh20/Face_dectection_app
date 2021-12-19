import React from "react";
import tachyons from "tachyons";
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import Particles from "react-particles-js";
import ParticlesOption from "./Components/Config/ParticleConfig";
import SearchInput from './Components/SearchInput/SearchInput';
import Clarifai from 'clarifai';
import FaceDectionSection from "./Components/FaceDetectionSection/FaceDetectionSection";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import './App.css'


const app=new Clarifai.App({
  apiKey: 'bf99fd98482f4bcebc6f9e4c1d668129'
})
const initialState={
 input:'',
  imgUrl:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    password:'',
    email:'',
    entries:0,
    joined: ''
  }
}

class App extends React.Component{
  constructor(){
    super()
    this.state=initialState
      
  }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }
  //This section calculates the face location in the image then returns values to be used by the box state
  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('image');
    const width=Number(image.width);
    const height=Number(image.height)
    return{
      leftCol: clarifaiFace.left_col*width,
      rightCol: width-(clarifaiFace.right_col*width),
      topRow: clarifaiFace.top_row*height,
      bottomRow: height-(clarifaiFace.bottom_row*height)
    }
  }
  displayBox=(box)=>{
    this.setState({box: box})
  }

  onSearchChange=(event)=>{
   this.setState({input: event.target.value})
  }
  onClickChange=()=>{
    this.setState({imgUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //the box state will use the return value from the calculateFaceLocation function
    .then(response=>{
      if(response){
        fetch('http://localhost:3001/image',{
          method: 'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
          id:this.state.user.id
          })
        }).then(response=>response.json()).then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
    }
      this.displayBox(this.calculateFaceLocation(response))
    })
  
    .catch(err=> console.log(err))
     }
     onRouteChange=(route)=>{
       if(route==='signin'){
         this.setState(initialState)
       }else if(route==='home'){
         this.setState({isSignedIn:true})
       }
       this.setState({route: route})
     }
 
  render(){
    return(
      <div className="">
       <Particles className="particles" params={ParticlesOption}/>
       <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
       { this.state.route === 'home'
       ? <div><Logo />
       <Rank  name={this.state.user.name} entries={this.state.user.entries}/>
       <SearchInput onSearchChange={this.onSearchChange} onClickChange={this.onClickChange}/>
       <FaceDectionSection box={this.state.box} imgUrl={this.state.imgUrl}/>
       </div>
       :(
         this.state.route==='signin'
         ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       )
      }
      </div>
    )
  }
}

export default App;
