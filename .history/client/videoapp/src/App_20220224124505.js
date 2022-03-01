import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login, Homepage, Room} from './components'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Homepage />}/>
          <Route path = '/login' element = {<Login />}/>
          <Route path = '/room/:name' element = {<Room />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
