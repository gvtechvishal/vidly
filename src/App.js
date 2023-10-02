import React, { Component } from "react";
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import { Routes,Route,Navigate } from "react-router-dom";
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound';
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import './App.css'

class App extends Component {
  state = {};
  render() {
    return (
      <>
        <main className="container">
          <NavBar />  
          <div className="content">
              <Routes>  
                    <Route path="/" element= {<Navigate to ='/movies'/>}/>  
                    <Route path="/movies" element={< Movies/>}></Route>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="/rentals" element={<Rentals/>}></Route>
                    <Route path="/login" element={<LoginForm/>}></Route>
                    <Route path="/register" element = { <RegisterForm />}></Route>
                    <Route path="/not-found" element={<NotFound/>}></Route>
                    <Route path="/movies/:_id" element ={<MovieForm />}></Route>
                    <Route path="*" element={<Navigate to='/not-found' replace/>}></Route>
              </Routes>
          </div>
        </main>
      </>
    );
  }
}

export default App;
