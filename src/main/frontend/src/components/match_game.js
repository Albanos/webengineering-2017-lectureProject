/**
 * @author Luan Hajzeraj on 03.08.2017.
 */


import React from "react";

import {getNextUnreadUsertext, likeUsertext} from "../util/Http";

class MatchGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: [],
            id: undefined
        };

        this.handleLike = this.handleLike.bind(this);
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
        this.componentWillMount();
    }

    render() {
        return (
            <div className="component">
                <h1>Match-Game</h1>
                {this.state.text}
                <br/>
                <span onClick={this.handleLike}>Like</span>
                <br/>
                <span onClick={this.handleDislike.bind(this)}>Dislike</span>
            </div>
        );
    }
}

export default MatchGame;