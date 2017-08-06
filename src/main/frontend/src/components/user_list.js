/**
 * @author Luan Hajzeraj on 30.07.2017.
 */

import React from "react";
import {getAllUsers} from "../util/Http";


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        getAllUsers()
            .then((response) => this.setState({users:response.data}));
    }

    renderUsers() {
        return this.state.users.map(user => {
            return (
                <li key={user.id}>
                    {user.email} , {user.usertext}
                </li>
            );
        });
    }

    render() {
        return (
            <div className="component">
                <h1>List of all Users</h1>
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        );
    }
}


export default UserList;