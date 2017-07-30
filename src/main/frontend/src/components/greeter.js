/**
    * @author Luan Hajzeraj on 30.07.2017.
    */

/*
Wir schreiben nun eine eigene Componente, eben als Klasse. Diese Componenten sind EcmaScript6 (ECS6), sie werden zu
ECS5 umgebaut (damit sie in allen Browsern nutzbar sind) und später ausgeliefert.

In der index.js werden diese Komponenten dann einfach importiert und eingesetzt/später ausgeliefert
*/
import React from "react";

//import einer eigens geschriebenen componente counter
import Counter from "./counter";

/*
class Greeter extends React.Component {
    render() {
        const message = !this.props.message ? 'unknown' : this.props.message;
        return <h1>Hello, {message}! (<Counter />)</h1>
    }
}
*/

/*
Genau die gleiche Funktionalität wie die darüber liegende Klasse Greeter, nur "schwächer": Wir haben beim zurückliefern
des <h1> (siehe return) keinen State (zwar schon im counter, aber der steht ja woanders; hier: keinen state). Daher
ist die Komponente einfacher und demnach kann sie auch einfacher umgeschrieben werden: Nutzung als "functional component"
*/

/*
ECS6-Syntax: Wir übergeben an die functional-component ein message-attribut. Ist dieses null (siehe const-Definition)
setze es auf unknown, sonst eben auf die übergebene message.
Anschliessend gibst du alles zurück
 */
const Greeter = ({message}) => {
    const procMessage = !message ? 'unknown' : message;
    //return <h1>Hello, {procMessage}! (<Counter />)</h1>

    /*
    Diese Variante ermöglicht das klicken auf den ganzen Text: wir spannen also den counter um den text, so muss nicht
    auf die Zahl geklickt werden, um den counter zu erhöhen
     */
    return(
        <Counter>
            <h1>Hello, {procMessage}! </h1>
        </Counter>
    );
};
export default Greeter;

