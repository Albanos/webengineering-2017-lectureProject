/**
 * @author Luan Hajzeraj on 20.08.2017.
 */

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {translate} from "react-i18next";
import {getUserByID, sendChatMessage, getUnreadMessages, login, stillOnlineCheck} from '../util/Http';
import User from '../util/User';


//Template from: https://bootsnipp.com/snippets/ZlkBn
class NewMessagePopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history:props.history,
            newMessage: undefined,
            lastAuthors:[]
        };

        window.updateNewMessagePopUp = function () {
            if(stillOnlineCheck()){
                this.startInterval();
            }
            else if(this.intervalID){
                clearInterval(this.intervalID);
                this.setState({newMessage: undefined,lastAuthors:[]});


                this.intervalID = undefined;
            }
        }.bind(this);

    }

    startInterval(){

        //https://stackoverflow.com/a/19746771
        function compareArray(a1,a2){
            return a1.length==a2.length && a1.every((v,i)=> v === a2[i]);
        }

        this.intervalID = setInterval(() => {
            getUnreadMessages()
                .then(response =>{
                    var authors = response.data.map(message =>{
                        if(this.state.history.location.pathname != '/api/chat/'+message.author.id) {
                            return message.author.nickname;
                        }
                    });
                    var authorsFiltered = authors.filter((id,pos) => { return authors.indexOf(id) == pos });

                    if(authorsFiltered && !compareArray(authors,this.state.lastAuthors)){
                        this.setState({newMessage: authorsFiltered.join(', ')});
                    }

                    this.setState({lastAuthors:authors});

                    /*
                    setTimeout(() => {
                        this.setState({newMessage:undefined});
                    },2000);
                    */

                });
        }, 5000);
    }

    //Wenn Komponente schon gerendert ist: Lade alle Nachrichten und definiere einen Abfrage-interval
    componentDidMount() {
        if(stillOnlineCheck()){
            this.startInterval();
        }
    }

    //Wenn die Komponente verlassen wird: resete den interval
    componentWillUnmount() {
        //clearInterval(this.state.interval);

    }

    handleClose(){
        this.setState({newMessage: undefined});
    }


    render() {
        const {t} = this.props;
        return (
            <div class="myPopUp">
                {this.state.newMessage &&
                <div class="alert alert-info">
                    <a class="close" onClick={this.handleClose.bind(this)}>&emsp;&times;</a>
                    {t('newMessageFrom')} {this.state.newMessage}
                </div>
                }
            </div>
        );
    }
}

export default withRouter(translate()(NewMessagePopUp));
