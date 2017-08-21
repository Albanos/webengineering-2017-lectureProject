/**
    * @author Luan Hajzeraj on 30.07.2017.
    */


import React from "react";
import axios from "axios";


class Messages extends React.Component {
    constructor(props) {
        super();
        this.state = {
            from:[],
            timestamp:[],
            message:[]

        }
    }

    // This function is called before render() to initialize its state.
    //zunächst statisch, nur für Luan
    componentWillMount() {
        axios.get('/api/message/myMessages',
            {
                // Configuration --> statisch, nur Luan
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJMdWFuIiwianRpIjoiMSJ9.EXMOS1asys58SpOJRmn4pvbFj9eBQ91s7297pbBEwbJWunFQlkhYuWYoauCQXQfxue1U5wXxlmO_URILmTJ9qQ'
                }
            })
            .then(({data}) => {
                this.setState({
                    from: data,
                    timestamp: data.timestamp,
                    message: data.message
                })
            });
    }


    renderFromUser() {
        return this.state.from.map((userEntry => {
            return (
                <li key={userEntry.id}>
                    {userEntry.nickname}
                </li>
            );
        }));
    }



    render(){
        return(
            <div>
                <h4>Messages of Actual User</h4>
                <ul>
                    <li>From:</li>
                    <ul>
                        {this.renderFromUser()}
                    </ul>
                    <li>Zeit: {this.state.from.timestamp}</li>
                    <li>Message: {this.state.from.message}</li>
                </ul>
            </div>
        );
    }
}


export default Messages;