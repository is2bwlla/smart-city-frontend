import React from "react";
import "./styles/styles.css";
import "./styles/App.css";
import Login from "./components/login";
import Home from "./pages/home";
import SignUp from "./components/signup";
import './input.css';
import Umidity from "./pages/umidity";
import PrivateRoute from "./routes/privateRoute";
import TemperatureTable from "./pages/temperature";
import Luminosity from "./pages/luminosity";
import Counter from "./pages/counter";

// IMPORTAÇÕES DE ROUTER:
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SensorTable from "./pages/sensor";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/umidity" element={<PrivateRoute><Umidity/></PrivateRoute>}/>
        <Route path="/temperature" element={<PrivateRoute><TemperatureTable/></PrivateRoute>}/>
        <Route path="/luminosity" element={<PrivateRoute><Luminosity/></PrivateRoute>}/>
        <Route path="/counter" element={<PrivateRoute><Counter/></PrivateRoute>}/>
        <Route path="/sensor" element={<PrivateRoute><SensorTable/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
