import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { GoogleOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Space } from 'antd';
import  { firebase }  from './../../firebase/config'
// import { signInWithEmailAndPassword } from './../../services/firebase.service'

const { Header, Content, Footer } = Layout;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onFinish = (values) => {
        console.log('Received values of form: ', values);
       
        firebase
            .auth()
            .signInWithEmailAndPassword(values.username, values.password)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }

    // isDisableButton = data => {
    //     if(data.username.trim().length> 3 && data.check_textInputChange == true){
    //         return false;
    //     } else return true;
    // }


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
                            <Button type="primary" htmlType="submit" className="login-form-button" block >
                                Log in
                            </Button>
                            <Space size="large" direction="horizontal" />

                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                Or <Link to="/signup">SignUp Now</Link>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                <Button type="primary" icon={<GoogleOutlined />} block>Login with Google</Button>
                            </div>
                            
                            
                        </Form.Item>
                    </Form>
                </Card>
            </div>
         );
    }
}
 
export default Login;