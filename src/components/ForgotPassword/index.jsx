import React, { useState, useEffect } from "react"
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google"
import config from "config"
import { Link, Redirect } from "react-router-dom"
import { Icon, message } from "antd"

import back from "../../static/back.png"
import "./index.css"

const ForgotPassword = () => {
  const [submitted, toSubmit] = useState(false)
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)

  const handleEmail = e => {
    if (e.target.value === "") {
      message.warning("Email is required.")
    }
    setEmail(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    toSubmit(true)
  }

  loadReCaptcha()

  useEffect(() => {
    localStorage.removeItem("user")
  }, [])

  const checkSubmit = () => (email != "" ? true : false)

  useEffect(() => {
    if (!submitted) return
    toSubmit(false)
    if (checkSubmit()) {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("accept", "application/json")
      fetch(`${config.apiUrl}/auth/password/reset`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email })
      })
        .then(response => response.json())
        .then(data => {          
          if (data.message !== "Auth failed") {
            setSuccess(true)
            message.success(data.message)
          } else {
            message.warning("Wrong email and/or password!")
          }
        })
    } else {
      message.warning("Email is required.")
    }
  }, [submitted])

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
              <h2 className="text-center">Forgot your password?</h2>
              <br />
              <form name="form" onSubmit={handleSubmit}>
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
                  />
                  {submitted && !email && (
                    <div className="help-block">Email is required</div>
                  )}
                </div>
                <div
                  className="form-group captchaForm"
                  style={{ textAlign: "center" }}
                >
                  <ReCaptcha
                    sitekey="6Ldn6qUUAAAAACc50evcxq8nAM43Esh_sQ81c0qN"
                    style={{ display: "table" }}
                    render="explicit"
                    size="normal"
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-warning" style={{ width: "100%" }}>
                    Send recovery email
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
  )
}

export default ForgotPassword