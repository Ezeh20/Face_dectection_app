import React from "react";
import './Register.css'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      name:''
    }
  }
  onEmailChange=(event)=>{
    this.setState({email:event.target.value})
  }
  onPasswordChange=(event)=>{
    this.setState({password:event.target.value})
  }
  onNameChange=(event)=>{
    this.setState({name:event.target.value})
  }
  onRegister=()=>{
    fetch('https://sleepy-dusk-13865.herokuapp.com/register',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      })
    }).then(response=>response.json()).then(user=>{
      if(user){
        this.props.loadUser(user);
        this.props.onRouteChange('home')
      }else{
        alert('username or email already exists')
      }
    })
  }
  render(){
    return(
      <article className="br2 ba dark-gray bg-white  mv4 w-100 w-50-m w-25-l mw6 top center shadow-5 br4">
       <main className="pa4 white-80">
        <form className="measure ">
          <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 blue">Register</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f5 black" for="email-address">Name</label>
              <input  onChange={this.onNameChange} className="pa2 input-reset ba bg-white b--light-blue w-100"   id="email-address"/>
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f5 black" for="email-address">Email</label>
              <input  onChange={this.onEmailChange} className="pa2 input-reset ba bg-white b--light-blue w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw4 lh-copy f5 black" for="password">Password</label>
              <input onChange={this.onPasswordChange}  className="b pa2 input-reset ba bg-white b--light-blue w-100" type="password" name="password"  id="password"/>
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onRegister} className="b ph3 pointer pv2 input-reset ba b--lightest-blue bg-lightest-black br2 shadow-4 grow pointer f6 dib " type="submit" value="Register"/>
          </div>
        </form>
      </main>
      </article>         
          )
  }
 
}
export default Register