import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import { Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
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
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                            Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                            Log in
                            </Button>
                            Or <Link to="/signup">SignUp Now</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
         );
    }
}
 
export default SignUp;