/**
 * Login-Komponente für den User
 *
 * @author Luan Hajzeraj on 31.07.2017.
 */

import React from "react";
import {HashRouter as Router, Route, Link, withRouter} from 'react-router-dom';

import {translate} from "react-i18next";
import SignUp from "./signUp";
import {login, logout} from "../util/Http"

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: undefined,
            lang: 'en',
            history: props.history
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
            .then(() => {
                this.setState({error: false});
                this.state.history.push('/user/actual');
            })
            .catch(() => this.setState({error: true}));
    }

    render() {

        const {t} = this.props;
        return (

            <Router>
                <div class="container">
                    <div class="page-header">
                        <div class="pull-right">
                            <Route path="/signUp" component={SignUp}/>
                            <Link to="/signUp">{t('signUp')}</Link>
                        </div>
                        <div class="clearfix"></div>
                    </div>

                    <h2>{t('login')}</h2>

                    <br/>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div class="form-group">
                            <div>
                                <label for="email">{t('emailAddress')}</label>
                                <input type="text" class="form-control" id="email" value={this.state.email}
                                       onChange={this.handleEmailChange}/>
                                <br/>
                            </div>
                        </div>

                        <div class="form-group center">
                            <div>
                                <label for="pwd">{t('password')}</label>
                                <input type="password" class="form-control" id="pwd" value={this.state.password}
                                       onChange={this.handlePasswordChange}/>
                                <br/>
                                <button type="submit" class="btn btn-default">{t('login')}</button>

                                <br/>

                                <br/>
                                {this.state.error &&
                                <div class="alert alert-danger col-xs-8">
                                    {t('loginNotSuccesful')}
                                </div>
                                }
                            </div>
                        </div>
                        <br/>
                    </form>

                </div>
            </Router >
        );
    }
}

export default withRouter(translate()(Authentication));