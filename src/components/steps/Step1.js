import React, { Component } from 'react';
import { Radio, InputNumber, Space} from 'antd';
import { Row, Col } from 'antd';
import * as _ from 'lodash';
import HomeContext from '../../context/homeContext'

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.data }
    }

    onChangeGroup = e => {
        this.setState({...this.state, Group: e.target.value });
          
    };

  
    onSetStepOne = () =>{
        const { setStepOne } = this.context;
        setStepOne(this.state);
    }

    onChangeSSCGrade = e =>{
        this.setState({...this.state, CGPA: {SSC: e, HSC: this.state.CGPA.HSC } });
    };
    onChangeHSCGrade = e =>{
        this.setState({...this.state, CGPA:{HSC: e, SSC:this.state.CGPA.SSC } });
    };

    render() { 
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Row>
            <Col span={2}></Col>
            <Col span={10}>
                <div>
                    <h4>Group</h4>
                    <Radio.Group  name="group" onChange={this.onChangeGroup} defaultValue={this.state.Group} label='SSC Department'>
                    <Radio style={radioStyle} value="Science">
                        Science
                    </Radio>
                    <Radio style={radioStyle} value="Arts">
                        Arts
                    </Radio>
                    <Radio style={radioStyle} value="Commerce">
                        Commerce
                    </Radio>
                    </Radio.Group>
                
                </div>
            </Col>

            <Col span={2}></Col>
            <Col span={10}>
                <h4>SSC CGPA</h4>
                <InputNumber size="small" min={1} max={5} defaultValue={this.state.CGPA.SSC} onChange={this.onChangeSSCGrade} />
                
                <h4>HSC CGPA</h4>
                <InputNumber size="small" min={1} max={5} defaultValue={this.state.CGPA.HSC} onChange={this.onChangeHSCGrade} />
            </Col>
            </Row>
            
        );
    }
}
 
export default Step1;
