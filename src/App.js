import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

import auth from "./services/authServices";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.currentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <>
        <main className="container">
          <ToastContainer />
          <NavBar user={this.state.user} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/movies" />} />
              <Route path="/movies" element={<Movies />}></Route>
              <Route path="/customers" element={<Customers />}></Route>
              <Route path="/rentals" element={<Rentals />}></Route>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/register" element={<RegisterForm />}></Route>
              <Route path="/not-found" element={<NotFound />}></Route>
              <Route path="/movies/:_id" element={<MovieForm />}></Route>
              <Route
                path="*"
                element={<Navigate to="/not-found" replace />}
              ></Route>
            </Routes>
          </div>
        </main>
      </>
    );
  }
}

export default withRouter(App);
