/**
 * Registrierung
 *
 * @author Luan Hajzeraj on 04.08.2017.
 */

import React from "react";

import {signUp} from "../util/Http";
import {translate} from "react-i18next";
import {withRouter} from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            usertext: '',
            error: undefined,
            history: props.history
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
            .then(() => {
                this.setState({error: false});
                this.state.history.push('/user/actual');
            })
            .catch(() => this.setState({error: true}));
    }

    render() {
        const {t} = this.props;
        return (
            <div class="container">
                <h2>{t('signUp')}</h2>
                <br/>
                {t('signUpIntro')}
                <br/>
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
                        </div>
                    </div>
                    <div class="form-group center">
                        <div>
                            <label for="pwd">{t('usertext')}</label>
                            <input type="text" class="form-control" value={this.state.usertext}
                                   onChange={this.handleUserTextChange}/>
                            <br/>
                            <button type="submit" class="btn btn-default">{t('SignUpAndLogin')}</button>

                            <br/>
                            <br/>

                            { this.state.error == true &&
                            <div class="alert alert-danger col-xs-8">
                                {t('loginNotSuccesful')}
                            </div>
                            }

                            {this.state.error == false &&
                            <div class="alert alert-success col-xs-8">
                                {t('loginSuccesful')}
                            </div>
                            }

                        </div>
                    </div>

                    <br/>
                </form>

            </div>

        )
    }
}

export default withRouter(translate()(SignUp)) ;