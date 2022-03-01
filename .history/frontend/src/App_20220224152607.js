import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Homepage from './components/Homepage';
import Room from './components/Room'
import './App.css';

function App() {
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
