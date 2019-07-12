import React, { useState, useEffect } from "react";
import axios from 'axios';
import config from "config";
import { Link, Redirect } from "react-router-dom";
import { Icon, message } from "antd";
import back from "../../../static/back.png";

export const SignUp = props => {
  const [submitted, setSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [success, setSuccess] = useState(false);

  const receivedToken = new URLSearchParams(props.location.search).get("token");

  const handleFirstName = event => {
    if (event.target.value === "") {
      message.warning("First name is required.");
    }
    setFirstName(event.target.value);
  };
  const handleLastName = event => {
    if (event.target.value === "") {
      message.warning("Last name is required.");
    }
    setLastName(event.target.value);
  };
  const handleEmail = event => {
    if (event.target.value === "") {
      message.warning("Email is required.");
    }
    setEmail(event.target.value);
  };
  const handlePassword = event => {
    if (event.target.value === "") {
      message.warning("Password is required.");
    }
    setPassword(event.target.value);
  };
  const handlePassword1 = event => {
    if (event.target.value === "") {
      message.warning("Confirm Password is required.");
    }
    setPassword1(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    setSubmit(true);
  };

  const checkSubmit = () =>
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    password !== "" &&
    password === password1
      ? true
      : false;

  useEffect(() => {
    if (!submitted) return;
    setSubmit(false);
    if (checkSubmit()) {
      axios({
        method: 'post',
        url: `${config.apiUrl}/auth/signup`,
        data: {
          first: firstName,
          last: lastName,
          email: email,
          password: password,
          token: receivedToken
        }
      })        
        .then(response => {
          if (response.data.message === "User created") {
            message.success("Registration process completed succesfully!");
            setSuccess(true);
          } else {
            message.warning(response.data.error);
          }
        });
    } else {
      message.warning(
        "All fields are required and confirm/Password must be same as Confirm Password"
      );
    }
  }, [submitted]);

  return (
    <div
      className="custom"
      style={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <img
        src={back}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: 1
        }}
      />
      <div
        className="container"
        style={{ position: "absolute", zIndex: 2, width: "100%" }}
      >
        <div className="row">
          <div className="col-sm-4 col-xs-1" />
          <div
            className="col-sm-4 col-xs-10"
            style={{
              padding: "50px 30px",
              background: "white",
              borderRadius: "3px",
              marginTop: "25vh"
            }}
          >
            <div>
              <h2 className="text-center">Signup</h2>
              <br />
              <form name="form" onSubmit={handleSubmit}>
                <div
                  className={
                    "form-group" + (submitted && !firstName ? " has-error" : "")
                  }
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    autoComplete="true"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstName}
                    onBlur={handleFirstName}
                  />
                  {submitted && !firstName && (
                    <div className="help-block">First name is required</div>
                  )}
                </div>
                <div
                  className={
                    "form-group" + (submitted && !lastName ? " has-error" : "")
                  }
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    autoComplete="true"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastName}
                    onBlur={handleLastName}
                  />
                  {submitted && !lastName && (
                    <div className="help-block">Last name is required</div>
                  )}
                </div>
                <div
                  className={
                    "form-group" + (submitted && !email ? " has-error" : "")
                  }
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    autoComplete="true"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    onBlur={handleEmail}
                  />
                  {submitted && !email && (
                    <div className="help-block">Email is required</div>
                  )}
                </div>
                <div
                  className={
                    "form-group" + (submitted && !password ? " has-error" : "")
                  }
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="true"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    onBlur={handlePassword}
                  />
                  {submitted && !password && (
                    <div className="help-block">Password is required</div>
                  )}
                </div>
                <div
                  className={
                    "form-group" + (submitted && !password ? " has-error" : "")
                  }
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="true"
                    name="password1"
                    value={password1}
                    onChange={handlePassword1}
                  />
                  {submitted && !password1 && (
                    <div className="help-block">Password is required</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <button className="btn btn-warning" style={{ width: "100%" }}>
                    Create Account
                  </button>
                </div>
                <br />
                <div className="text-left">
                  <Link to={`/login`}>
                    <Icon type="left" />
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {success && <Redirect to="/login" />}
    </div>
  );
};

