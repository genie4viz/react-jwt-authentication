import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import CustomHeader from '../CustomHeader'
import logo from '../../static/main_logo.png'
import './index.css'

const { Sider, Content } = Layout
const { SubMenu } = Menu

const HomePage = ({ children }) => {
  return (
    <Layout>
      <Sider
        style={{ minHeight: '100vh', background: '#252525' }}
        breakpoint='lg'
      >
        <div
          style={{
            color: 'white',
            height: 32,
            marginTop: 16,
            marginBottom: 50,
            textAlign: 'center'
          }}
        >
          <Link to='/'>
            <img src={logo} style={{ width: '90%' }} />
          </Link>
        </div>
        <hr
          style={{
            height: '1px',
            color: '#3f3f3f',
            background: '#3f3f3f',
            border: 'none',
            margin: '10px'
          }}
        />
        <Menu
          theme='dark'
          mode='inline'
          style={{ background: '#252525' }}
          defaultSelectedKeys={['cryptoassets']}
          selectedKeys={['cryptoassets']}
          defaultOpenKeys={['sub0']}
        >
          <SubMenu
            key='sub0'
            title={
              <span>
                <Icon type='caret-right' />
                <span style={{ fontSize: '8pt' }}>MARKETS</span>
              </span>
            }
            style={{ height: '15px !important' }}
          >
            <Menu.Item key='cryptoassets' style={{ height: '15px !important' }}>
              <Link to='/cryptoassets' />
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>ASSETS</span>              
            </Menu.Item>
            <Menu.Item key='exchanges' style={{ height: '15px !important' }}>
              <Link to='/exchanges' />
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>EXCHANGES</span>             
            </Menu.Item>
            <Menu.Item key='icoieos' disabled>
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>ICOS/IEOS</span>
            </Menu.Item>
            <Menu.Item key='stablecoins'>
              <Link to='/stablecoins' />
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>STABLECOINS</span>              
            </Menu.Item>
            <Menu.Item key='lbitcoins'>
              <Link to='/lbitcoins' />
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>LOCALBITCOINS</span>              
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='networks' disabled>
            <Icon type='caret-right' />
            <span style={{ fontSize: '8pt' }}>NETWORKS</span>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={
              <span>
                <Icon type='caret-right' />
                <span style={{ fontSize: '8pt' }}>LABS</span>
              </span>
            }
          >
            <Menu.Item key='comparison'>
              <Link to='/comparison' />
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>COMPARISON TOOL</span>              
            </Menu.Item>
            <Menu.Item key='liquidity' disabled>
              <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
              <span style={{ fontSize: '8pt' }}>LIQUIDITY</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='projections' disabled>
            <Icon type='caret-right' />
            <span style={{ fontSize: '8pt' }}>PROJECTIONS</span>
          </Menu.Item>
          <Menu.Item key='alerts' disabled>
            <Icon type='caret-right' />
            <span style={{ fontSize: '8pt' }}>ALERTS</span>
          </Menu.Item>
          <Menu.Item key='dictionary'>
            <Link to='/dictionary' />
            <Icon type='caret-right' />
            <span style={{ fontSize: '8pt' }}>DICTIONARY</span>            
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <CustomHeader />
        <Content>{children}</Content>        
      </Layout>
    </Layout>
  )
}

export default HomePage
