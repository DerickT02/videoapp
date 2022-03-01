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
    Axios.get('')
  })

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path = "/login" element = {<Login />}/>
            <Route path = "/" element = {<Homepage />}/>
            <Route path = "room/:id" element = {<Room/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
