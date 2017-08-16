/**
 * @author Luan Hajzeraj on 03.08.2017.
 */


import React from "react";

import {getNextUnreadUsertext, likeUsertext, dislikeUsertext} from "../util/Http";
import {translate} from "react-i18next";
import i18n from "../i18n";

class MatchGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: [],
            id: undefined
        };

        this.handleLike = this.handleLike.bind(this);

        //i18n.changeLanguage("en");
    }

    // This function is called before render() to initialize its state.
    componentWillMount() {
        getNextUnreadUsertext()
            .then((response) => {
                this.setState({
                    text: response.data.usertext,
                    id: response.data.id
                });
            });
    }

    handleLike() {
        likeUsertext(this.state.id)
            .then(() => {
                this.componentWillMount();
            });
    }

    handleDislike(event) {
        event.preventDefault();

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
                    <button type="button" class="btn btn-success btn-lg" onClick={this.handleLike}><span class="glyphicon glyphicon-thumbs-up"/> {t('like')}</button>&emsp;&emsp;
                    <button type="button" class="btn btn-danger btn-lg" onClick={this.handleDislike.bind(this)}><span class="glyphicon glyphicon-thumbs-down"/> {t('dislike')}</button>
                </div>
            </div>

        );
    }
}

export default translate()(MatchGame);