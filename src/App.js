import React, { Component } from 'react';
import './App.css';
import { Button, DatePicker } from 'antd';
import Navbar from './components/common/Navbar';

import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import Social from './components/screens/Social';
import UniRank from './components/screens/UniRank';
import Home from './components/screens/Home';
import Result from './components/screens/Result';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAuthenticated: true
     }
  }
  
  render() { 
    if (!this.state.isAuthenticated) {
      return (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </Router>
      )
    }
    return (
      <Router>
        <Layout className="layout">
          <Navbar />
          <Content style={{ padding: '25px 15px' }}>
            <div className="site-layout-content">
                <div>
                  <Switch>
                    <Route path="/" exact>
                      <Home />
                    </Route>
                    <Route path="/social">
                      <Social />
                    </Route>
                    <Route path="/unirank">
                      <UniRank />
                    </Route>
                    <Route path="/result">
                      <Result />
                    </Route>

                    <Redirect to="/" />

                  </Switch>
                </div>
            </div>
  
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Router>
    );
  }
}
 
export default App;
