import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { useHeaders, numberWithCommasDecimals, getUserInfo } from '../../utils';
const { Header } = Layout;

const innerMenu = () => {
  const user_email = getUserInfo().email;
  return (
    <Menu style={{ zIndex: '9999' }}>
      <Menu.Item key="0">
        <Link to="/" style={{ margin: 3 }}>
          {user_email}
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/login" style={{ margin: 3 }}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const CustomHeader = ({ onHeaderSectionClick }) => {
  const headers = useHeaders();
  return (
    <Header
      style={{
        lineHeight: '5px',
        background: 'black',
        display: 'flex',
        height: 'auto',
        paddingBottom: '20px',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          fontSize: '9pt',
          paddingRight: 20,
          justifyContent: 'space-between',
          marginTop: '10px',
          width: '100%'
        }}
      >
        <div
          className="row"
          style={{
            marginTop: '15px',
            fontSize: '9pt',
            fontWeight: '500',
            justifyContent: 'space-around',
            lineHeight: 1.5
          }}
        >
          <div className="col-sm-2 col-md-2 col-lg-2">
            <span
              style={{ color: '#A1A1A1', cursor: 'pointer' }}
              onClick={() => onHeaderSectionClick('markets_cryptoassets')}
            >
              Assets&nbsp;&nbsp;
            </span>
            <span
              style={{ fontWeight: '700', color: 'white', cursor: 'pointer' }}
              onClick={() => onHeaderSectionClick('markets_cryptoassets')}
            >
              {headers.dtra_active_assets}
            </span>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <span
              style={{ color: '#A1A1A1', cursor: 'pointer' }}
              onClick={() => onHeaderSectionClick('markets_exchanges')}
            >
              Exchanges&nbsp;&nbsp;
            </span>
            <span
              style={{ fontWeight: '700', color: 'white', cursor: 'pointer' }}
              onClick={() => onHeaderSectionClick('markets_exchanges')}
            >
              {headers.dtra_active_exchanges}
            </span>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <span style={{ color: '#A1A1A1' }}>Marketcap</span>
            <span style={{ color: 'white' }}>
              &nbsp;&nbsp;$
              {numberWithCommasDecimals(headers.marketcap_dtra_active)}
            </span>
            <span style={{ color: '#EF5350' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(
              {numberWithCommasDecimals(headers.marketcap_change_dtra_active, 2)}% 24h)
            </span>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <span style={{ color: '#F4F4F4' }}> Dominance : </span>
            <span style={{ color: '#A1A1A1' }}>&nbsp;&nbsp;&nbsp;&nbsp;BTC</span>
            <span style={{ color: 'white' }}>&nbsp;{parseFloat(headers.dominance_btc).toFixed(2)}%</span>
            <span style={{ color: '#A1A1A1' }}> &nbsp;&nbsp;&nbsp;ETH</span>
            <span style={{ color: 'white' }}>&nbsp;{parseFloat(headers.dominance_eth).toFixed(2)}%</span>
            <span style={{ color: '#A1A1A1' }}> &nbsp;&nbsp;&nbsp;OTHERS</span>
            <span style={{ color: 'white' }}>&nbsp;{parseFloat(headers.dominance_others).toFixed(2)}%</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        <Dropdown overlay={innerMenu()} trigger={['click']}>
          <Button
            type="primary"
            shape="circle"
            icon="setting"
            style={{
              marginTop: 16,
              color: 'white',
              background: 'transparent',
              border: 'white',
              boxShadow: 'none'
            }}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default CustomHeader;
