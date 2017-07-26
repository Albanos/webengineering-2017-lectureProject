/**
    * @author Luan Hajzeraj on 26.07.2017.
    */



/*
 Wir definieren eine eigene Klasse und übergeben dies an die Variable Greeter. Damit definieren wir dann etwas weiter unten
 im Code quasi einen eigenen HTML-Tag.

 NUN: Wir importieren die notwendigen Libs und bauen eine eigene Klasse, im Java-Stil
 */
import React from "react";
import ReactDOM from "react-dom";

    class Greeter extends React.Component {
        render() {
            return <h1>Hello, {this.props.message}!</h1>

        }
    }

/*
 Zunächst: Finde in der index.html das Element "root" und binde den jeweiligen HTML-Code ein. Was ist aber, wenn
 ich Greeter öfter verwenden möchte? --> Dann muss dies wieder in ein eigenes <div>-Tag (siehe weiter unten)
 */
/*
ReactDOM.render(
    <Greeter message="other Guys"/>,
    document.getElementById('root'));
*/

ReactDOM.render(
    <div>
        <Greeter message="Person 1"/>
        <Greeter message="Person 2"/>
    </div>,
    document.getElementById('root'));