import React, { Component } from 'react';
import { Layout, Menu, Divider, Avatar   } from 'antd';

import { Drawer, Button} from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import  AuthContext  from './../../context/authContext'

const { Header } = Layout;

class Navbar extends Component {
    // static contextType = AuthContext;
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

    signOut = () => {
       const { userLogOut} = this.context;
       // console.log(userLogOut);
       userLogOut()
        // firebase.auth().signOut();
    }

    render() {
        const { user} = this.context;
        console.log(user);
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
                placement='right'
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                key='asuais'
            >   <div className="nav-user">
                     <Avatar size={64} icon={<UserOutlined />} />
                     <div className="nav-user-details">
                        <span className="user-name">{user.fullName ? user.fullName : user.displayName}</span>
                        <br></br>
                       <span className="user-email">{user.email }</span>
                     </div>
                </div>
               
                 <Divider type="horizontal " />
                <Menu theme="light" mode="vertical" defaultSelectedKeys={['1']}>
                <Menu.Item key="21"><Link to="/home">Home</Link></Menu.Item>
                <Menu.Item key="31"><Link to="/social">Social</Link></Menu.Item>
                <Menu.Item key="41"><Link to="/unirank">University Ranking</Link></Menu.Item>
                <Menu.Item key="51"><Link to="/result">Result</Link></Menu.Item>
                <Menu.Item key="5s1" ><Button type="primary" onClick={this.signOut}>Sign Out</Button></Menu.Item>
                </Menu>
            </Drawer>
        </Header>
        );
    }
}
export default Navbar;
Navbar.contextType = AuthContext;