import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined , MailOutlined} from '@ant-design/icons';
import { Card } from 'antd';
import  { firebase }  from './../../firebase/config'
import { Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onFinish = values => {
        if (values.password !== values.confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        
        firebase.auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((response) => {
                const uid = response.user.uid
                const newdata = {
                    id: uid,
                    email: values.email,
                    fullName: values.username,
                    role: 'user'
                };
                // alert(uid);
                const usersRef = firebase.firestore().collection('users');
                usersRef
                   .doc(uid)
                   .set(newdata)
                   .then(() => {
                    //    navigation.navigate('MainTabScreen');
                   })
                   .catch((error) => {
                       alert(error)
                   });
            })
            .catch((error) => {
                alert(error)
        });
    }


    render() { 
        return ( 
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: 'rgb(208 208 208)' }}>
                <Card style={{  }}>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            {/* <MailOutlined /> */}
                            <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            type="email"
                            placeholder="email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                            Sign Up
                            </Button>
                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                Or <Link to="/signIn">Sign In</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
         );
    }
}
 
export default SignUp;