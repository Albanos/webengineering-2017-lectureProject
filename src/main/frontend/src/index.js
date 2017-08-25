/**
 * Hauptklasse/Basis für React-komponenten
 *
 * @author Luan Hajzeraj on 26.07.2017.
 */


import React from "react";
import {CookiesProvider} from "react-cookie";
import ReactDOM from "react-dom"
import {I18nextProvider} from "react-i18next";
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import {history} from "react-router";

import Authentication from "./components/authentication";
import CurrentUser from "./components/current_user";
import MatchGame from "./components/match_game";
import SignUp from "./components/signUp";
import NavBar from "./components/navBar";
import Chat from "./components/chat"
import i18n from "./i18n";
import NewMessagePopUp from "./components/newMessagePopUp"


ReactDOM.render(
    <CookiesProvider>
        <I18nextProvider i18n={i18n}>
            <Router history={history}>
                <div>
                    <NavBar/>

                    <NewMessagePopUp/>

                    <Switch>
                        {/*Authentifizierung*/}
                        <Route path="/user/login" component={Authentication}/>

                        {/*Aktuell eingeloggter User*/}
                        <Route path="/user/actual" component={CurrentUser}/>

                        {/*Trefferspiel*/}
                        <Route path="/matchgame" component={MatchGame}/>

                        {/*Konto erstellen*/}
                        <Route path="/signUp" component={SignUp}/>

                        {/*Chat*/}
                        <Route path="/api/chat/:id" component={Chat}/>
                    </Switch>
                </div>
            </Router>
        </I18nextProvider>
    </CookiesProvider>,

    document.getElementById('root'));