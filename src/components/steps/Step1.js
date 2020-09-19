import React, { Component } from 'react';
import { Radio } from 'antd';
import { Row, Col } from 'antd';



class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0,  }
    }

    onChangeSSC = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };

    onChangeHSC = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };

    render() { 
      const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
      const { value } = this.state;
      return (
        <Row>
          <Col span={12}>
            <Radio.Group  name="ssc" onChange={this.onChangeSSC} defaultValue={1} label='SSC Department'>
              <Radio style={radioStyle} value={1}>
                Science
              </Radio>
              <Radio style={radioStyle} value={2}>
                Arts
              </Radio>
              <Radio style={radioStyle} value={3}>
                Commerce
              </Radio>
            </Radio.Group>
          </Col>
          <Col span={12}>
            <Radio.Group name="hsc" onChange={this.onChangeHSC} defaultValue={4} label='HSC Department'>
              <Radio style={radioStyle} value={4}>
                Science
              </Radio>
              <Radio style={radioStyle} value={5}>
                Arts
              </Radio>
              <Radio style={radioStyle} value={6}>
                Commerce
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        
      );
    }
}
 
export default Step1;