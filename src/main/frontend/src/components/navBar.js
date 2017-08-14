/**
 * @author Luan Hajzeraj on 06.08.2017.
 */

import React from "react";
import {Link, withRouter} from "react-router-dom";
import {stillOnlineCheck, logout} from "../util/Http";
import {translate} from "react-i18next";
import i18n from "../i18n";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: undefined,
            history:props.history
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

        this.state.history.push('/user/login');
    }

    handleLanguage(event) {
        if (event.target.outerText == "DE") {
            i18n.changeLanguage("de");
        }
        else if (event.target.outerText == "EN") {
            i18n.changeLanguage("en");
        }
    }

    render() {
        const {t} = this.props;
        return (
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#/user/actual">fratcher</a>
                    </div>
                    {this.state.loggedIn &&
                    <ul class="nav navbar-nav">
                        <li><Link to="/user/actual">{t('actualUser')}</Link></li>
                        <li><Link to="/matchgame">{t('matchGame')}</Link></li>
                    </ul>
                    }
                    <ul class="nav navbar-nav navbar-right">
                        {this.state.loggedIn  && <li><a>{this.state.loggedIn.email}</a></li> }
                        {this.state.loggedIn ?
                            <li><a href onClick={this.handleLogout.bind(this)}>{t('logout')}</a></li>
                            :
                            <li><Link to="/user/login">{t('login')}</Link></li>
                        }
                    </ul>
                </div>
                <div class="container-fluid">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a class="pointer" onClick={this.handleLanguage}>DE</a></li>
                        <li><a class="pointer" onClick={this.handleLanguage}>EN</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(translate()(NavBar));