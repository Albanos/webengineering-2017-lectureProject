/**
    * @author Luan Hajzeraj on 31.07.2017.
    */

import axios from "axios";
import React from "react";
import {withCookies} from "react-cookie";
import {HashRouter as Router, Route} from 'react-router-dom';
import {Link} from"react-router-dom";


import User from "../util/User";
import SignUp from "./signUp";


class Authentication extends React.Component {
    /*
    Erklärung des Codes: Siehe Vorlesung 7, ab etwa min 45
    */


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: undefined
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.cookies = this.props.cookies;
    }

    //Wird geladen, bevor eine Komponente angezeigt wird
    componentWillMount() {
        const auth = this.cookies.get('auth');
        if(auth){
            axios.defaults.headers.common['Authorization'] = auth.token;
            User.email = auth.user.email;
            User.id = auth.user.id;
        }
    }

    handleLogout() {
        const {cookies} = this.props;

        axios.defaults.headers.common['Authorization'] = undefined;
        User.email = undefined;
        User.id = -1;
        this.cookies.remove('auth');
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
        axios.post('/api/user/login', this.state, {
            // We allow a status code of 401 (unauthorized). Otherwise it is interpreted as an error and we can't
            // check the HTTP status code.
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status == 401
            }
        })
            .then(({data, status, headers}) => {
                /*
                Je nachdem, was wir erhalten: 200 --> Alles wie zuvor. 401 --> Setze error auf true und rendere
                error-message
                */
                switch(status) {
                    case 200:
                        axios.defaults.headers.common['Authorization'] = headers.authorization;

                        User.email = data.userName;
                        User.id = data.id;

                        console.log(data);

                        // Store authentication values even after refresh.
                        this.cookies.set('auth', {
                            token: headers.authorization,
                            user: User
                        }, {path: '/'});

                        this.setState({error: false});

                        // Since we do not have the User as part of the component's state,
                        // calling this.SetState() makes no sense. Instead we have to manually
                        // force the component to update.
                        this.forceUpdate();



                        break;
                    case 401:
                        this.setState({error: true});
                        break;
                }
            });
    }

    //Wir packen den Teil, der konditional gerendert werden soll in eine separate variable. Gleiche Funktionalität
    //wie unten, nur kompakter, in einer komponente
    render() {
        let component = null;
        if (User.isNotAuthenticated()) {
            component =
                <Router>
                <form onSubmit={this.handleSubmit}>
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
                </Router>
        }
        else{
            component=
                <span onClick={this.handleLogout}>Logout</span>
        }


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

export default withCookies(Authentication);