import React, { Component, useReducer } from "react";
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import { currentuser } from "./services/authServices";
import withRouter from "./components/hoc/getParaFromURL";
import ProtectedRoute from "../src/components/common/ProtectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = currentuser();
    this.setState({ user: user });
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
              <Route
                path="/movies"
                element={<Movies user={this.state.user} />}
              ></Route>
              <Route path="/customers" element={<Customers />}></Route>
              <Route path="/rentals" element={<Rentals />}></Route>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/register" element={<RegisterForm />}></Route>
              <Route path="/not-found" element={<NotFound />}></Route>
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/movies/:_id" element={<MovieForm />}></Route>
              </Route>
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
