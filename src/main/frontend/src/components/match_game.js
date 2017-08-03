/**
    * @author Luan Hajzeraj on 03.08.2017.
    */

/**
 * @author Luan Hajzeraj on 30.07.2017.
 */


import React from "react";
import axios from "axios";
import {withCookies} from "react-cookie";


class MatchGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:[],
            id:undefined
        };

        this.handleLike = this.handleLike.bind(this);
        this.cookies = this.props.cookies;
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        const auth = this.cookies.get('auth');
        if(auth){
            axios.defaults.headers.common['Authorization'] = auth.token;

            axios.get('/api/user/nextUnread')
                .then((response) => {
                    this.setState({
                        text: response.data.usertext,
                        id:response.data.id
                    })

                });
        }


    }

    handleLike(){
        let ID = this.state.id
        let rs = Number(ID)
        //ID = IDL
        console.log(ID)

        axios({
            method: 'post',
            url: '/api/user/like',
            data: {
                id:rs
            }
        });


        /*
        axios.get('/api/user/like', {
            params: {
                id: ID
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        */

        /*
        axios.post('/api/user/like/{id}', {
            id: ID
        });
        */


        this.forceUpdate();


    }

    render() {
        return(
            <div className="component">
                <h1>Match-Game</h1>
                {this.state.text}
                <br/>
                <span onClick={this.handleLike}>Like</span>
                <br/>
                <span>Dislike</span>
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


export default withCookies(MatchGame);