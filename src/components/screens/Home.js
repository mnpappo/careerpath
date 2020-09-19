import { findAllByTestId } from '@testing-library/react';
import React, { Component } from 'react';

class Home  extends Component {
    constructor(props) {
        super(props);
        this.state = { isUserData: false  }
    }
    render() { 
        return (
            <h1>Home Page</h1>
        );
    }
}
 
export default Home;