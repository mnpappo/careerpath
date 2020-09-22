import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, InputNumber } from 'antd';
import * as _ from 'lodash';
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
        this.state = { subjects : props.data  }
    }

    onFieldsChange = (values) => {
        if(values.length == 1){
            console.log('Success:', values);
        }
     
    };
  
    onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    onChangeSSCGrade = (subject) => {
        debugger;
        console.log(subject);
    }

    render() { 
     
      const subjects = this.state.subjects;
      
      return (
        <Row>
            <Col span={24}>

            <Form
              {...layout}
              name="basic"
              onFieldsChange={this.onFieldsChange}
              onFinishFailed={this.onFinishFailed}
            >
              {subjects &&
                subjects.map( (subject, index) => {
                  return(
                    // <p key={name}>{name} - {grade}</p>
                  <Form.Item label={_.startCase(subject.name)}  name={subject.name} key={index} >
                    <InputNumber size="small" min={0} max={5} defaultValue={subject.grade}  onChange={this.onChangeSSCGrade(subject)} />
                  </Form.Item>
                  );
                })
              }
            </Form>
          </Col>
        </Row>
        
      );
    }
}
 
export default Step2;