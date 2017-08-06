/**
 * @author Luan Hajzeraj on 04.08.2017.
 */

import React from "react";

import {signUp} from "../util/Http";
import User from "../util/User";

// A general counter component.
class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            usertext: '',
            error: undefined
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserTextChange = this.handleUserTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }


    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleUserTextChange(event) {
        this.setState({usertext: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        signUp(this.state.email, this.state.password, this.state.usertext)
            .then(() => this.setState({error: false}))
            .catch(() => this.setState({error: true}));
    }

    render() {

        return (

            <div className="component">
                <h1>Sign up</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Please enter your E-Mail-Adress, a password and your specific Text to complete the registration.
                        <br/>
                        <br/>

                        Email
                        <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <br/>
                    <label>
                        Password
                        <input type="password" name="password" value={this.state.password}
                               onChange={this.handlePasswordChange}/>
                    </label>
                    <br/>
                    <label>
                        Usertext:
                        <input type="text" name="usertext" value={this.state.usertext}
                               onChange={this.handleUserTextChange}/>

                    </label>
                    <input type="submit" value="Submit"/>
                </form>

                { this.state.error == true &&
                <div className="error">
                    Sign up was not successful.
                </div>
                }

                {this.state.error == false &&
                <div className="succesful">
                    Sign up was successful.
                </div>
                }
            </div>
        )
    }
}

export default SignUp;