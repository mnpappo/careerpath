import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Input, Button, Radio } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }

    onFinish = (values) => {
      console.log('Success:', values);
    };
  
    onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    render() { 

      return (
        <Row>
          <Col span={24}>
          <Form
              {...layout}
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item label="Bangla" name="bangla">
                <Input />
              </Form.Item>
              <Form.Item label="English" name="english">
                <Input />
              </Form.Item>
              <Form.Item label="Math" name="math">
                <Input />
              </Form.Item>
              <Form.Item label="Higher Math" name="highermath">
                <Input />
              </Form.Item>
              <Form.Item label="Biology" name="biology">
                <Input />
              </Form.Item>
              <Form.Item label="Social Science" name="socialscience">
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        
      );
    }
}
 
export default Step2;