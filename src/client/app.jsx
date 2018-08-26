import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SignIn from './User/components/login';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <SignIn />
        )
    }
}

ReactDom.render(<App />, document.getElementById("root"));