import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Homepage from './components/Homepage';
import Room from './components/Room'
import './App.css';
import Axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

Axios.defaults.withCredentials = true

useEffect(() => {
  Axios.get('http://localhost:5000/users/login').then((res) => {
    if(res.data.loggedIn == true){
      console.log(res.data)
      setLoggedIn(true)
    }
  })
}, [])


 



  return (
    <div className="App">

    {loggedIn ? <BrowserRouter>
          <Routes>
            
            <Route path = "/homepage" element = {<Homepage />}/>
            <Route path = "room/:id" element = {<Room/>}/>
            <Route path = "/" element = {<Navigate replace to = "/homepage"/>}/>
          </Routes>

        </BrowserRouter> :  
        <BrowserRouter>
        <Routes>    
            <Route path = "/homepage" element = {<Navigate replace to = "/"/>}/>
            <Route path = "room/:id" element = {<Navigate replace to = "/"/>}/>
            <Route path = "/" element = {<Login />}/>
          </Routes>
        </BrowserRouter>}
        
     
    </div>
  );
}

export default App;
