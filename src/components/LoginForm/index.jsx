import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import config from 'config'
import { Link, Redirect } from 'react-router-dom'

import back from '../../static/back.png'
import logo from '../../static/logo_beta_6.svg'
import './index.css'

const LoginForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    e.preventDefault()
    setSubmitted(true)
  }
  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  useEffect(
    () => {
      if (!submitted) return
      setSubmitted(false)
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('accept', 'application/json')
      fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email: email, password: password })
      })
        .then(response => response.json())
        .then(data => {          
          if (data.message !== 'Auth failed') {            
            localStorage.setItem('user', JSON.stringify(data))
            setSuccess(true)
          } else {
            message.warning('Wrong email and/or password!')
          }
        })
    },
    [submitted]
  )
  return (
    <div
      className='custom'
      style={{ height: '100vh', width: '100vw', position: 'relative' }}
    >
      <img
        src={back}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: 1
        }}
      />
      <div
        className='container'
        style={{ position: 'absolute', zIndex: 2, width: '100%' }}
      >
        <div className='row' style={{ textAlign: 'center', marginTop: '10vh' }}>
          <img src={logo} />
        </div>
        <div
          className='row'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            className='col-sm-4 col-xs-10'
            style={{
              padding: '40px 30px',
              background: 'white',
              borderRadius: '2px',
              marginTop: '6vh'
            }}
          >
            <div>
              <h2
                className='text-center'
                style={{ fontFamily: 'Poppins, Light', color: '#455A64' }}
              >
                Sign in to start your session
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Username'
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='password'
                    placeholder='Password'
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button className='sign-in-button' htmlType='submit' block>
                    Sign In
                  </Button>
                </Form.Item>
                <Form.Item>
                  <div style={{ textAlign: 'center' }}>
                    <a className='login-form-forgot' href=''>
                      Forgot password?
                    </a>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
