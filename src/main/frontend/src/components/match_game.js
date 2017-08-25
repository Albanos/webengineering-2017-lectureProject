/**
 * Trefferspiel des Users (für like und dislike von Usertexten)
 *
 * @author Luan Hajzeraj on 03.08.2017.
 */


import React from "react";
import {withRouter} from 'react-router-dom';

import {getNextUnreadUsertext, likeUsertext, dislikeUsertext, getActualUser} from "../util/Http";
import {translate} from "react-i18next";

class MatchGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: [],
            id: undefined,
            error: false,
            history: props.history
        };

        this.handleLike = this.handleLike.bind(this);
    }

    componentWillMount() {
        getNextUnreadUsertext()
            .then((response) => {
                this.setState({
                    text: response.data.usertext,
                    id: response.data.id,
                    error: false
                });
            })
            .catch(() => {
                getActualUser()
                    .catch(() => {
                        this.state.history.push('/user/actual');
                    });

                this.setState({error: true});

            });
    }

    handleLike() {
        likeUsertext(this.state.id)
            .then(() => {
                this.componentWillMount();
            });
    }

    handleDislike() {
        dislikeUsertext(this.state.id)
            .then(() => {
                this.componentWillMount();
            });


    }

    render() {
        const {t} = this.props;
        return (
            <div class="container">
                <h2>{t('matchGame')}</h2>
                <br/>
                <div class="text-center">
                    <div class="well">
                        <i>{this.state.text}</i>
                    </div>
                    <button type="button" class="btn btn-success btn-lg" onClick={this.handleLike}><span
                        class="glyphicon glyphicon-thumbs-up"/> {t('like')}</button>
                    &emsp;&emsp;
                    <button type="button" class="btn btn-danger btn-lg" onClick={this.handleDislike.bind(this)}><span
                        class="glyphicon glyphicon-thumbs-down"/> {t('dislike')}</button>
                </div>
                <br/>

                {this.state.error == true &&
                <div class="alert alert-danger">
                    <strong>{t('aLittleProblem')}</strong>
                </div>
                }
            </div>

        );
    }
}

export default withRouter(translate()(MatchGame));