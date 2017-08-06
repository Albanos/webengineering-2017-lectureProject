/**
    * @author Luan Hajzeraj on 31.07.2017.
    */

import React from "react";
import {HashRouter as Router, Route, Link} from 'react-router-dom';

import User from "../util/User";
import SignUp from "./signUp";
import {login, logout } from "../util/Http"

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: undefined,
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        logout();
        this.forceUpdate();
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state.email, this.state.password)
            .then(() =>{
                this.setState({error:false});
            })
            .catch(() => this.setState({error:true}));
    }

    //Wir packen den Teil, der konditional gerendert werden soll in eine separate variable. Gleiche Funktionalität
    //wie unten, nur kompakter, in einer komponente
    render() {
           let component =
                <Router>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {/*Note that the HTML structure will be changed later when we add Bootstrap/CSS*/}
                    <label>
                        Email
                        <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={this.state.password}
                               onChange={this.handlePasswordChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                    <br/>
                    <br/>
                    <div>
                        <Route path="/signUp" component={SignUp}/>
                        <Link to="/signUp">Sign Up</Link>
                    </div>
                    {/*<span onClick={this.handleSignUp}>Sign up</span>*/}
                </form>
                </Router>;


        return (
            <div className="component">
                <h1>Authentication</h1>
                Current user: {User.email || 'not logged in'}

                <p/>
                {component}

                <p/>

                {/*CONDITIONAL RENDERING: rendere nur, wenn Bedingung erfuellt ist! Oft benötigt...*/}
                { this.state.error &&
                <div className="error">
                    Login was not successful.
                </div>
                }
            </div>

        );
    }
}

export default Authentication;