import { useState, useEffect } from 'react'
import Axios from 'axios'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [registerUser, setRegisterUser] = useState(false)
    

    const register = async () => {
      if(username.length > 0 && password.length > 8 && email.includes("@")){
      await Axios.post("http://localhost:5000/users/register", {username: username, password: password, email: email}).then((res) => {
        return (
          <div>
            <h1>Please Log In</h1>
          </div>
        )
      });
      }
      if(!username.length){
        return (
          <div>
            <h1>Invalid Username</h1>
          </div>
        )
      }

      if(!password.length < 8){
        return(
        <div>
            <h1>Make a Stronger Password</h1>
          </div>
        )
      }

      if(!email.includes("@")){
        return(
          <div>
              <h1>Invalid Email Format</h1>
            </div>
          )
      }

    }

    const toggleRegister = () => {
      if(registerUser){
        setRegisterUser(false)
      }
      else{
        setRegisterUser(true)
      }
    }


    const login = async () => {
      await Axios.post("http://localhost:5000/users/register", {username: username, password: password, email: email}).then((res) => {
        if(res.data.loggedIn === true){
          navigate('/')
        }
      });
    }

    return(
        <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p class="message">Already registered? <a href="#">Sign In</a></p>
          </form>
          <form class="login-form">
            <input type="text" placeholder="username"/>
            <input type="text" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button onClick = {!registerUser ? login : register}>{!registerUser ? "Login" : "Register"}</button>
            <p class="message">Not registered? <p onClick = {toggleRegister}>Create an account</p></p>
          </form>
        </div>
      </div>
    )
}

export default Login