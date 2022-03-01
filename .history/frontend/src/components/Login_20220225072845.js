import { useState, useEffect } from 'react'
import Axios from 'axios'
import './Login.css'

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const register = () => {
      Axios.post("http://localhost:5000/users/register", {username: username, password: password, email: email});
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
            <button>login</button>
            <p class="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    )
}

export default Login