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
    

    const register =  () => {
      Axios.post("http://localhost:5000/users/register", {username: username, password: password, email: email}).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })

    }

    const toggleRegister = () => {
      if(registerUser){
        setRegisterUser(false)
      }
      else{
        setRegisterUser(true)
      }
    }


    const login = () => {
       Axios.post("http://localhost:5000/users/login", {username: username, password: password, email: email}).then((res) => {
        console.log(res.data)
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
            <input type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}}/>
            <input type="text" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick = {!registerUser ? login : register}>{!registerUser ? "Login" : "Register"}</button>
            <p class="message">Not registered? <p onClick = {toggleRegister}>Create an account</p></p>
          </form>
        </div>
      </div>
    )
}

export default Login