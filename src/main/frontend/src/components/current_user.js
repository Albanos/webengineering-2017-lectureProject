/**
 * @author Luan Hajzeraj on 30.07.2017.
 */


import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {getActualUser} from '../util/Http';
import {translate} from "react-i18next";
import i18n from "../i18n";

class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            matches: [],
            followI: [],
            followMe: [],
            history:props.history
        };

        //i18n.changeLanguage("en");
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        getActualUser()
            .then(({data}) => {
                this.setState({
                    user: data,
                    matches: data.matches,
                    followI: data.followI,
                    followMe: data.followMe
                });
            })
            .catch(() => {
                this.state.history.push('/user/login');
            });
    }

    renderUserMatches() {
        return this.state.matches.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    <Link to={'/api/chat/' + userEntry.id}> {userEntry.nickname} </Link>
                </li>
            );
        }));
    }

    renderFollowI() {
        return this.state.followI.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.nickname}
                </li>
            );
        }));
    }

    renderFollowMe() {
        return this.state.followMe.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.nickname}
                </li>
            );
        }));
    }


    render() {
        const {t} = this.props;
        return (
            <div class="container">
                <h2>{t('actualUser')}</h2>
                <br/>
                <h2>{this.state.user.userName}</h2>
                <h4><i>{this.state.user.userText}</i></h4>
                <br/>
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                    {t('followI')}</a>
                            </h4>
                        </div>
                        <div id="collapse1" class="panel-collapse collapse in">
                            <div class="panel-body">{this.renderFollowI()}</div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                    {t('followMe')}</a>
                            </h4>
                        </div>
                        <div id="collapse2" class="panel-collapse collapse">
                            <div class="panel-body">{this.renderFollowMe()}</div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                                    {t('match')}</a>
                            </h4>
                        </div>
                        <div id="collapse3" class="panel-collapse collapse">
                            <div class="panel-body">{this.renderUserMatches()}</div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default withRouter(translate() (CurrentUser));