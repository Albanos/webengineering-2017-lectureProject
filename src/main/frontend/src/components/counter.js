/**
    * @author Luan Hajzeraj on 30.07.2017.
    */


import React from "react";

    // A general counter component.
    class Counter extends React.Component {
        constructor(props) {
            super();
            this.state = {
                    counter: 0
            }
        }

        onClick() {
            this.setState({
                counter: this.state.counter + 1
            });
        }

        render() {
            //return <span onClick={this.onClick.bind(this)}>{this.state.counter}</span>

            /*
            Diese Variante ermöglicht uns das klicken auf dem gesamten Text (siehe greeter-tag): Wir MÜSSEN nicht
            auf die Zahl klicken, um den COunter zu erhöhen
             */
            return (
                <div onClick={this.onClick.bind(this)}>
                    {this.props.children}
                    ({this.state.counter})
                </div>)
        }
    }


    export default Counter;