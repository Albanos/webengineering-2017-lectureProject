/**
 * Popup-Screen mit Info für neue Nachrichten
 *
 * @author Luan Hajzeraj on 20.08.2017.
 */

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {translate} from "react-i18next";
import {getUnreadMessages, stillOnlineCheck} from '../util/Http';

class NewMessagePopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            newMessage: undefined,
            lastAuthors: []
        };

        //Nach erfolgreichem Login: starte 5s intervall zum check nach neuen Nachrichten
        //Nach erfolgreichem Logout: stoppe intervall
        window.updateNewMessagePopUp = function () {
            if (stillOnlineCheck()) {
                this.startInterval();
            }
            else if (this.intervalID) {
                clearInterval(this.intervalID);
                this.setState({newMessage: undefined, lastAuthors: []});


                this.intervalID = undefined;
            }
        }.bind(this);

    }

    startInterval() {
        //Von https://stackoverflow.com/a/19746771
        function compareArray(a1, a2) {
            return a1.length == a2.length && a1.every((v, i)=> v === a2[i]);
        }

        this.intervalID = setInterval(() => {
            getUnreadMessages()
                .then(response => {
                    var authors = response.data.map(message => {
                        if (this.state.history.location.pathname != '/api/chat/' + message.author.id) {
                            return message.author.nickname;
                        }
                    });
                    var authorsFiltered = authors.filter((id, pos) => {
                        return authors.indexOf(id) == pos
                    });

                    if (authorsFiltered && !compareArray(authors, this.state.lastAuthors)) {
                        this.setState({newMessage: authorsFiltered.join(', ')});
                    }

                    this.setState({lastAuthors: authors});

                });
        }, 5000);
    }

    //Wenn User bereits eingeloggt (bspw über Cookie) starte abfrage Intervall für neue Nachrichten
    componentDidMount() {
        if (stillOnlineCheck()) {
            this.startInterval();
        }
    }

    handleClose() {
        this.setState({newMessage: undefined});
    }

    //Befindet sich der User nicht im jeweilligen Chat (Abfrage über path) so bekommt er bei jeder neuen Nachricht
    //eine Information, dass von User x neue Nachrichten vorliegen.
    //Dies kann der User selbst ausblenden (über x an Info-Fenster) oder nach lesen der Nachricht wird die Info
    //ausgeblendet.
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
