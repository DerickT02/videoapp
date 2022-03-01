import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Homepage from './components/Homepage';
import Room from './components/Room';
import './App.css';

function App() {
  render (
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
