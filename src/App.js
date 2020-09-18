import React, { Component , createContext} from 'react';
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

import{ firebase }  from './firebase/config'

import AuthContext from './context/authContext'

const { Header, Content, Footer } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isAuthenticated: false,
        user: null,
        isLoading: true,
     }
  }

  userLogOut = () => {
    firebase.auth().signOut();
    this.setState({...this.state, isAuthenticated : false, user: null, isLoading: false})
  }
  componentDidMount(){
    if(!firebase) return
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const userRef = firebase.firestore().collection('users')
        userRef.doc(user.uid).onSnapshot(documentSnapshot => {
            const newUser = documentSnapshot.data();
            this.setState({...this.state, isAuthenticated : true, user: newUser, isLoading: false})
        });
      } else{
          this.setState({...this.state, isLoading: false})
      }
    })
  }
  
  render() { 
    if(this.state.isLoading) { return(<></>) }
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
        <AuthContext.Provider value={{userLogOut :this.userLogOut }}>
            <Router>
                <Layout className="layout">
                <Navbar />
                <Content style={{ padding: '25px 50px' }}>
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
      </AuthContext.Provider>
    );
  }
}
 
export default App;
