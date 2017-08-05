/**
    * @author Luan Hajzeraj on 04.08.2017.
    */

import React from "react";
import axios from "axios";
import {withCookies} from "react-cookie";
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
        this.cookies = this.props.cookies;
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }


    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleUserTextChange(event){
        this.setState({usertext: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();

        axios.post('/api/user', this.state, {
            // We allow a status code of 401 (unauthorized). Otherwise it is interpreted as an error and we can't
            // check the HTTP status code.
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status == 400
            }
        })
            .then(({data, status}) => {
                /*
                 Je nachdem, was wir erhalten: 200 --> Alles wie zuvor. 400 --> Setze error auf true und rendere
                 error-message
                 */
                switch(status) {
                    case 200:

                        this.setState({error: false});





                        // Since we do not have the User as part of the component's state,
                        // calling this.SetState() makes no sense. Instead we have to manually
                        // force the component to update.
                        this.forceUpdate();



                        break;
                    case 400:
                        this.setState({error: true});

                        this.forceUpdate();
                        break;
                }
            });

        axios.post('/api/user/login', this.state)
            .then(({data, status, headers}) => {
                //console.log(response);

                //Die id muss auch gesetzt werden, da sie über die isAuthenticated()-Methode des Users
                //zurückgegeben wird
                User.email = data.userName;
                User.id = data.id;


                this.cookies.set('auth', {
                    token: headers.authorization,
                    user: User
                }, {path: '/'});
            });






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


export default withCookies(SignUp);