/**
 * @author Luan Hajzeraj on 30.07.2017.
 */


import React from 'react';
import {Link} from 'react-router-dom';

import {getActualUser} from '../util/Http';

class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            matches: [],
            followI: [],
            followMe: []
        };
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
            });
    }

    renderUserMatches() {
        return this.state.matches.map((userEntry => {
            return (
                <li key={userEntry.id}>
                  <Link to={'/api/chat/'+userEntry.id} > {userEntry.email} </Link>
                </li>
            );
        }));
    }

    renderFollowI() {
        return this.state.followI.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.email}
                </li>
            );
        }));
    }

    renderFollowMe() {
        return this.state.followMe.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.email}
                </li>
            );
        }));
    }


    render() {
        return (
            <div className="component">
                <h1>Actual logged-In-User</h1>
                <ul>
                    <li>Name: {this.state.user.userName}</li>
                    <li>Usertext: {this.state.user.userText}</li>
                    <li>I follow:</li>
                    <ul>
                        {this.renderFollowI()}
                    </ul>
                    <li>Follow Me:</li>
                    <ul>
                        {this.renderFollowMe()}
                    </ul>
                    <li>Matches:</li>
                    <ul>
                        {this.renderUserMatches()}
                    </ul>
                </ul>
            </div>
        );
    }
}


export default CurrentUser;