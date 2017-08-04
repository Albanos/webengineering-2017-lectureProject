/**
    * @author Luan Hajzeraj on 04.08.2017.
    */

import React from "react";

// A general counter component.
class SignUp extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        //return <span onClick={this.onClick.bind(this)}>{this.state.counter}</span>

        /*
         Diese Variante ermöglicht uns das klicken auf dem gesamten Text (siehe greeter-tag): Wir MÜSSEN nicht
         auf die Zahl klicken, um den COunter zu erhöhen
         */
        return (
            <div className="component">
                <h1>Sign up</h1>
            </div>
        )
    }
}


export default SignUp;