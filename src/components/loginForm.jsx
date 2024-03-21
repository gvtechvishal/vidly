import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authServices";
import withRouter from "./hoc/getParaFromURL";
import { Navigate } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      // this.props.navigate("/");
      window.location = this.props.location.state
        ? this.props.location.state
        : "/";
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log("looccca==>", this.props.location.state);
    if (auth.currentUser()) return <Navigate to={"/"} />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
