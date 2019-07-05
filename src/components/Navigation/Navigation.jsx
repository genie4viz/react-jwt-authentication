import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Layout } from "antd";
import logo from "../../static/main_logo.png";
import "./Navigation.css";

const { SubMenu } = Menu;
const { Sider } = Layout;

export const Navigation = React.memo(({ navigationHandler, selectedMenu}) => {
  
  const onSelectNav = item => {
    navigationHandler(item.key);
  };
  
  return (
    <Sider
      style={{ minHeight: "100vh", background: "#252525" }}
      breakpoint="lg"      
    >
      <div
        style={{
          color: "white",
          height: 32,
          marginTop: 16,
          marginBottom: 50,
          textAlign: "center"
        }}
      >{console.log(selectedMenu, 'selected')}
        <Link to="/">
          <img src={logo} style={{ width: "90%" }} />
        </Link>
      </div>
      
      <hr
        style={{
          height: '1px',
          color: "#3f3f3f",
          background: "#3f3f3f",
          border: "none",
          margin:'10px'
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        style={{ background: "#252525" }}
        defaultSelectedKeys={[selectedMenu]}
        selectedKeys={[selectedMenu]}
        defaultOpenKeys={["sub0"]}
        onSelect={onSelectNav}
      >
        <SubMenu
          key="sub0"
          title={
            <span>
              <Icon type="caret-right" />
              <span style={{ fontSize: "8pt" }}>MARKETS</span>
            </span>
          }
          style={{height:'15px !important'}}
        >
          <Menu.Item key="assets" style={{height:'15px !important'}}>
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>ASSETS</span>
          </Menu.Item>
          <Menu.Item key="exchanges" style={{height:'15px !important'}}>
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>EXCHANGES</span>
          </Menu.Item>
          <Menu.Item key="icoieos" disabled={true}>
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>ICOS/IEOS</span>
          </Menu.Item>
          <Menu.Item key="stable">
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>STABLECOINS</span>
          </Menu.Item>
          <Menu.Item key="lbitcoin">
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>LOCALBITCOINS</span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="networks" disabled={true}>
          <Icon type="caret-right" />
          <span style={{ fontSize: "8pt" }}>NETWORKS</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="caret-right" />
              <span style={{ fontSize: "8pt" }}>LABS</span>
            </span>
          }
        >
          <Menu.Item key="compare">
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>COMPARISON TOOL</span>
          </Menu.Item>
          <Menu.Item key="liquidity" disabled={true}>
            <span style={{ fontSize: "8pt" }}>● </span>&nbsp;
            <span style={{ fontSize: "8pt" }}>LIQUIDITY</span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="projections" disabled={true}>
          <Icon type="caret-right" />
          <span style={{ fontSize: "8pt" }}>PROJECTIONS</span>
        </Menu.Item>
        <Menu.Item key="alerts" disabled={true}>
          <Icon type="caret-right" />
          <span style={{ fontSize: "8pt" }}>ALERTS</span>
        </Menu.Item>
        <Menu.Item key="dictionary">
          <Icon type="caret-right" />
          <span style={{ fontSize: "8pt" }}>DICTIONARY</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
});
