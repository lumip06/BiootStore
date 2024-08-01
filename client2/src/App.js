
import './App.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "../src/Login"
import Home from "./Home";
import Register from "./Register";
function App() {
  return (
    <div className="App">


        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>


    </div>
  );
}


export default App;
