import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/'/>
          <Route path = '/login'/>
          <Route path = '/room/:name'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
