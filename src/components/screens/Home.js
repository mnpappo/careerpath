import { findAllByTestId } from '@testing-library/react';
import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';

import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';

import {
    Redirect
  } from "react-router-dom";


const { Step } = Steps;

const steps = [
  {
    title: 'Department',
    content: <Step1 />,
  },
  {
    title: 'SSC',
    content: <Step2 />,
  },
  {
    title: 'HSC',
    content: <Step3 />,
  },
];


class Home  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserData: false,
            current: 0,
            isSubmitted: true
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    submit() {
        this.setState( this.isSubmitted = true )
    }
    render() { 
        const { current } = this.state;
        if(this.state.isSubmitted) {
            return (<Redirect to="/result" push />)
        } else {
            return (
                <>
                    <Steps current={current} size="small">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
        
                    <div className="steps-content">
                        {steps[current].content}
                    </div>
        
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                            Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
                            </Button>
                        )}
                    </div>
                </>
            );
        }
        
  
    }
}
 
export default Home;