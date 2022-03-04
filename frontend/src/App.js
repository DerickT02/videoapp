import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Homepage from './components/Homepage';
import Room from './components/Room'
import CreateRoom from './components/CreateRoom';
import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';




function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState("")

Axios.defaults.withCredentials = true

useEffect(() => {
  Axios.get('http://localhost:5000/users/login').then((res) => {
    if(res.data.loggedIn === true){
      setData(res.data)
      setCurrentUser(res.data.data[0].username)
      setLoggedIn(true)
    }
  })
}, [])

console.log(data)
 



  return (
    <div className="App">

    {loggedIn ? <BrowserRouter>
          <Routes>
            
            <Route path = "/homepage" element = {<Homepage currUser = {currentUser} />}/>
            <Route path = "/room/:id" element = {<Room currUser = {currentUser}/>}/>
            <Route path = "/createroom" element = {<CreateRoom currUser = {currentUser}/>}/>
            <Route path = "/" element = {<Navigate replace to = "/homepage"/>}/>
          </Routes>

        </BrowserRouter> :  
        <BrowserRouter>
        <Routes>    
            <Route path = "/homepage" element = {<Navigate replace to = "/"/>}/>
            <Route path = "/room/:id" element = {<Navigate replace to = "/"/>}/>
            <Route path = "/createroom" element = {<Navigate replace to = "/"/>}/>
            <Route path = "/" element = {<Login />}/>
          </Routes>
        </BrowserRouter>}
        
     
    </div>
  );
}

export default App;
