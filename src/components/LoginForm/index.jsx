import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import back from '../../static/back.png'
import logo from '../../static/logo_beta_6.svg'

const LoginForm = () => {
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
        <div className='row'>
          <div className='col-sm-4 col-xs-1' />
          <div
            className='col-sm-4 col-xs-10'
            style={{
              padding: '40px 30px',
              background: 'white',
              borderRadius: '2px',
              marginTop: '10vh'
            }}
          >
            <div>
              <h2
                className='text-center'
                style={{ fontFamily: 'Poppins, Light', color: '#455A64' }}
              >
                Sign in to start your session
              </h2>
              
              <Form className='login-form'>
                <Form.Item>
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
                </Form.Item>
                <Form.Item>
                  <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password'/>
                </Form.Item>
                <Form.Item>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit' className='login-form-button' block>Log in</Button>
                </Form.Item>
                <Form.Item>
                  <a className='login-form-forgot' href=''>Forgot password</a>
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
