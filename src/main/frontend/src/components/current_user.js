/**
    * @author Luan Hajzeraj on 30.07.2017.
    */


import React from "react";
import axios from "axios";


class CurrentUser extends React.Component {
    constructor(props) {
        super();
        this.state = {
            user: [],
            matches:[],
            followI:[],
            followMe:[]

        }
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        axios.get('/api/user/actualUser',
            {
                // Configuration --> aktuell: User Luan, statisch...
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJMdWFuIiwianRpIjoiMSJ9.EXMOS1asys58SpOJRmn4pvbFj9eBQ91s7297pbBEwbJWunFQlkhYuWYoauCQXQfxue1U5wXxlmO_URILmTJ9qQ'
                }
            })
            .then(({data}) => {
                this.setState({
                    user: data,
                    matches: data.matches,
                    followI: data.followI,
                    followMe: data.followMe
                })
            });
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
}


export default CurrentUser;