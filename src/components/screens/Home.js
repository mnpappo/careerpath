import React, { Component } from 'react';
import { Steps, Button , message } from 'antd';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';
import HomeContext from '../../context/homeContext'
import { scienceGroup, artsGroup, comerceGroup  } from './../../mock/subject'
import { Redirect } from "react-router-dom";
const { Step } = Steps;


class Home  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserData: false,
            data: null,
            current: 0,
            stepOneData: {Group: "Science",  CGPA: { SSC: 5 , HSC: 5}},
            stepTwoData: [],
            stepThreeData: [],
            isSubmitted: false
        };
        this.child = React.createRef();
    }

    initialStepTwoThreeDefine = (stepOne) => {
        const group = this.state.stepOneData.Group;
        // console.log(scienceGroup.SSC);

        switch(group){
            case "Science":
                this.setState(this.state.stepTwoData = scienceGroup.SSC );
                this.setState(this.state.stepThreeData = scienceGroup.HSC);
                break;
            case "Arts": 
                this.setState(this.state.stepTwoData = artsGroup.SSC );
                this.setState(this.state.stepThreeData = artsGroup.HSC);
                break;
            case "Commerce":
                this.setState(this.state.stepTwoData = comerceGroup.SSC);
                this.setState( this.state.stepThreeData = comerceGroup.HSC);
                break;
               
        }

        debugger;
        // console.log(this.state);
    };

    next() {
      
        if(this.child.current && this.state.current == 0){
            this.setState( this.state.stepOneData =  this.child.current.state );
            this.initialStepTwoThreeDefine(this.child.current.state);
        }
    
        const current = this.state.current + 1;
        this.setState({...this.state, current });
        
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({...this.state, current });
    }
    submit() {
        
        this.setState({...this.state, isSubmitted: true })
    }

    userDataFind = () =>{
        message.success('Processing complete!')
        this.setState( {...this.state, isUserData: true, isSubmitted: true} )
    }
  
    render() { 

        const { current } = this.state;
        // <HomeContext.Provider>
        const steps = [
            {
              title: 'Department',
              content: <Step1  ref={this.child} data={this.state.stepOneData}/>,
            },
            {
              title: 'SSC',
              data: 2,
              content: <Step2 ref={this.child} data={this.state.stepTwoData}/>,
            },
            {
              title: 'HSC',
              data: 3,
              content: <Step3 ref={this.child} data={this.state.stepThreeData}/>,
            },
          ];
        
        if(this.state.isSubmitted) {
            
            return (
                <>
                <Redirect to="/result" push />
                </>
            )
        } 
        else {
            return (
                <>
                    <Steps current={current} size="small" direction="horizontal" >
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
                            <Button type="primary" onClick={this.userDataFind}>
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
Home.contextType = HomeContext;