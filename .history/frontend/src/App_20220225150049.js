import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Homepage from './components/Homepage';
import Room from './components/Room'
import './App.css';
import Axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)





  useEffect(() => {
    Axios.get('http://localhost:5000/users/login').then((res) => {
      console.log(res.data)
      if(res.data.loggedIn == true){
        setLoggedIn(true)
      }
    })
  })



  return (
    <div className="App">

    
        <BrowserRouter>
          <Routes>
            
            <Route path = "/" element = {<Homepage />}/>
            <Route path = "room/:id" element = {<Room/>}/>
            <Route path = "/login" element = {<Login />}/>
          </Routes>
        </BrowserRouter>

     <button >Login</button>
    </div>
  );
}

export default App;
