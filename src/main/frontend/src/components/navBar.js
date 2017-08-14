/**
 * @author Luan Hajzeraj on 06.08.2017.
 */

import React from "react";
import {Link} from "react-router-dom";
import {stillOnlineCheck, logout} from "../util/Http";
import {translate} from "react-i18next";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: undefined,
            //history:props.params.history
        };
        window.updateNavbar = function () {
            this.setState({loggedIn: stillOnlineCheck()});
        }.bind(this);
    }

    componentWillMount() {
        this.state.loggedIn = stillOnlineCheck();
    }

    handleLogout(event) {
        event.preventDefault();
        logout();

        //this.state.history.push('/user/login');
    }

    render() {
        const {t} = this.props;
        return (
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#/user/actual">fratcher</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><Link to="/user/actual">{t('actualUser')}</Link></li>
                        <li><Link to="/matchgame">{t('matchGame')}</Link></li>
                        <li></li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        {this.state.loggedIn  && <li><a>{this.state.loggedIn.email}</a></li> }
                        {this.state.loggedIn ?
                            <li><a href onClick={this.handleLogout.bind(this)}>{t('logout')}</a></li>
                            :
                            <li><Link to="/user/login">{t('login')}</Link></li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default translate()(NavBar);