import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Layout, Menu, Breadcrumb } from 'antd';

import { Drawer, Button, Radio, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { Header, Content, Footer } = Layout;

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

render() {
    return (
      <Header>
        <div className="logo">
          <h1>CareerPath</h1>
        </div>

        <div className="navbar">
            <Button type="primary" onClick={this.showDrawer}>
              <MenuOutlined />
            </Button>
        </div>
        
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['10']}>
          {/* <Menu.Item key="10">
            <Button type="primary" onClick={this.showDrawer}>
              <MenuOutlined /> Menu
            </Button>
          </Menu.Item> */}
        </Menu>

        

        <Drawer
            title="Basic Drawer"
            placement='right'
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            key='asuais'
          >
            <Menu theme="light" mode="vertical" defaultSelectedKeys={['1']}>
              <Menu.Item key="21"><Link to="/home">Home</Link></Menu.Item>
              <Menu.Item key="31"><Link to="/social">Social</Link></Menu.Item>
              <Menu.Item key="41"><Link to="/unirank">University Ranking</Link></Menu.Item>
              <Menu.Item key="51"><Link to="/result">Result</Link></Menu.Item>
            </Menu>
          </Drawer>
      </Header>
    );
  }
}
export default Navbar;