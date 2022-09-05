import React from "react";
import './App.css';
import RegistrationPage from "./Components/RegistrationPage/RegistrationPage";
import MainPage from "./Components/MainPage/MainPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {

    const handleSubmit = e => {
        e.preventDefault();
    }

    const navigate = useNavigate();

  return (
    <div className="app-wrapper">
        <Navbar navigate={navigate} />
        <div className='app-wrapper-content'>
            <Routes>
                <Route exact path='/' element={
                    <Navigate to='/register' />} />
                <Route path='/register/*' element={
                    <RegistrationPage handleSubmit={handleSubmit} navigate={navigate} />} />
                <Route path='/login/*' element={
                    <LoginPage handleSubmit={handleSubmit} navigate={navigate} />} />
                <Route path='/statistic/*' element={

                    <MainPage handleSubmit={handleSubmit} />} />
                <Route path='*' element= {<div>Страница не найдена</div>} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
