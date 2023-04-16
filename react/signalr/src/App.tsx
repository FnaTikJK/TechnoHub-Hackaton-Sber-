import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Registration} from './pages/auth/Registration';
import {Authentication} from "./pages/auth/Authentication";
import {Home} from "./pages/Home";
import {Room} from "./pages/Room";

function App() {
    const [name, setName] = useState<string>(' ');

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'home'} element={<Home/>}/>
                <Route path={'reg'} element={<Registration setName={setName}/>}/>
                <Route path={'auth'} element={<Authentication/>}/>
                <Route path={'room'} element={<Room name={name}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
