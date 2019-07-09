import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import config from "config";
import { Link, Redirect } from "react-router-dom";
import { Icon, message } from "antd";
import { getReceivedToken, removeReceivedToken } from "../../utils";
import { AppContext } from "../../contexts/AppContext";
import back from "../../static/back.png";

const ResetPassword = () => {
  const { dispatch } = useContext(AppContext);
  const receivedToken = getReceivedToken();
  const [submitted, setSubmit] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [success, setSuccess] = useState(false);

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
    password !== "" && password === password1 ? true : false;

  useEffect(() => {
    if (!submitted) return;
    setSubmit(false);

    if (checkSubmit()) {      
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        url: `${config.apiUrl}/auth/password/set`,        
        data: {
          token: receivedToken,
          password: password
        }        
      })        
        .then(response => {          
          if (response.data.message !== "Auth failed") {
            removeReceivedToken();
            setSuccess(true);
            message.success("Reset password process completed succesfully!");
            dispatch({ type: "CHANGE_RECEIVEDTOKEN", value: receivedToken });
          } else {
            removeReceivedToken();
            message.warning(data.message);
            dispatch({ type: "CHANGE_RECEIVEDTOKEN", value: receivedToken });
          }
        });
    } else {
      message.warning(
        "Password is required! Password must be same as Confirm Password"
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
              <h2 className="text-center">Reset password</h2>
              <br />
              <form name="form" onSubmit={handleSubmit}>
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
                    Reset Password
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

export default ResetPassword;
