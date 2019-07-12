import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import { isUserAuthenticated } from '../../../utils';
import { CustomHeader } from '../../Others';
import logo from '../../../static/main_logo.png';
import './index.css';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const HomePage = ({ renderProps, children }) => {
  const routeInfo = renderProps.location.pathname.substring(1, renderProps.location.pathname.length);
  const selectedMenuItem = routeInfo;

  const onHeaderSectionClickHandler = section => {    
  };

  return (    
    <div>
      {isUserAuthenticated() ?
        <Layout>        
          <Sider style={{ minHeight: '100vh', background: '#252525' }} breakpoint="lg">
            <div
              style={{
                color: 'white',
                height: 32,
                marginTop: 16,
                marginBottom: 50,
                textAlign: 'center'
              }}
            >
              <Link to="/">
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
              theme="dark"
              mode="inline"
              style={{ background: '#252525' }}
              defaultSelectedKeys={['markets_cryptoassets']}
              selectedKeys={[selectedMenuItem]}
              defaultOpenKeys={['markets']}
            >
              <SubMenu
                key="markets"
                title={
                  <span>
                    <Icon type="caret-right" />
                    <span style={{ fontSize: '8pt' }}>MARKETS</span>
                  </span>
                }
                style={{ height: '15px !important' }}
              >
                <Menu.Item key="markets_cryptoassets" style={{ height: '15px !important' }}>
                  <Link to="/markets_cryptoassets" />
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>ASSETS</span>
                </Menu.Item>
                <Menu.Item key="markets_exchanges" style={{ height: '15px !important' }}>
                  <Link to="/markets_exchanges" />
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>EXCHANGES</span>
                </Menu.Item>
                <Menu.Item key="markets_icoieos" disabled>
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>ICOS/IEOS</span>
                </Menu.Item>
                <Menu.Item key="markets_stablecoins">
                  <Link to="/markets_stablecoins" />
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>STABLECOINS</span>
                </Menu.Item>
                <Menu.Item key="markets_lbitcoins">
                  <Link to="/markets_lbitcoins" />
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>LOCALBITCOINS</span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="networks" disabled>
                <Icon type="caret-right" />
                <span style={{ fontSize: '8pt' }}>NETWORKS</span>
              </Menu.Item>
              <SubMenu
                key="labs"
                title={
                  <span>
                    <Icon type="caret-right" />
                    <span style={{ fontSize: '8pt' }}>LABS</span>
                  </span>
                }
              >
                <Menu.Item key="labs_comparison">
                  <Link to="/labs_comparison" />
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>COMPARISON TOOL</span>
                </Menu.Item>
                <Menu.Item key="labs_liquidity" disabled>
                  <span style={{ fontSize: '8pt' }}>● </span>&nbsp;
                  <span style={{ fontSize: '8pt' }}>LIQUIDITY</span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="projections" disabled>
                <Icon type="caret-right" />
                <span style={{ fontSize: '8pt' }}>PROJECTIONS</span>
              </Menu.Item>
              <Menu.Item key="alerts" disabled>
                <Icon type="caret-right" />
                <span style={{ fontSize: '8pt' }}>ALERTS</span>
              </Menu.Item>
              <Menu.Item key="dictionary">
                <Link to="/dictionary" />
                <Icon type="caret-right" />
                <span style={{ fontSize: '8pt' }}>DICTIONARY</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <CustomHeader onHeaderSectionClick={onHeaderSectionClickHandler} />
            <Content>{children}</Content>
          </Layout>      
        </Layout>
      : <Redirect to='/login' />}
    </div>
  );
};

