/**
    * @author Luan Hajzeraj on 30.07.2017.
    */


import React from "react";
import axios from "axios";
import {withCookies} from "react-cookie";


class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            matches:[],
            followI:[],
            followMe:[]
        };
        this.cookies = this.props.cookies;
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        const auth = this.cookies.get('auth');
        if(auth){
            axios.defaults.headers.common['Authorization'] = auth.token;

            axios.get('/api/user/actualUser')
                .then(({data}) => {
                    this.setState({
                        user: data,
                        matches: data.matches,
                        followI: data.followI,
                        followMe: data.followMe
                    })
                });
        }


    }

    renderUserMatches() {
        return this.state.matches.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.email}
                </li>
            );
        }));
    }

    renderFollowI(){
        return this.state.followI.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.email}
                </li>
            );
        }));
    }

    renderFollowMe(){
        return this.state.followMe.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.email}
                </li>
            );
        }));
    }


    render() {
        return(
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

    /*
    render() {
        return(
            <div className="component">
                <h1>Actual logged-In-User</h1>
                <ul>
                    TEMPLATE
                </ul>
            </div>
        );
    }
    */
}


export default withCookies(CurrentUser);