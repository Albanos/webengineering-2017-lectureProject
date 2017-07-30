/**
    * @author Luan Hajzeraj on 30.07.2017.
    */

import React from "react";
import axios from "axios";


class UserList extends React.Component {
    constructor(props) {
        super();
        this.state = {
                users: []
        }
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        axios.get('/api/user')
            .then(({data}) => {
                this.setState({
                    users: data
                })
            });
    }

    renderUsers() {
        return this.state.users.map((user => {
            return (
                <li key={user.id}>
                    {user.email} , {user.usertext}
                </li>
            );
        }));
    }

    render() {
        return(
            <div>
                <h1>List of all Users</h1>
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        );
    }
}


export default UserList;