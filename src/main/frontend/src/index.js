/**
    * @author Luan Hajzeraj on 26.07.2017.
    */



/* MERKE: WIR HABEN NUN EIGENE COMPONENTEN (wie bspw greeter.js). DIESE IMPORTIEREN UND NUTZEN WIR IN DER RENDER-METHODE
 Wir definieren eine eigene Klasse und übergeben dies an die Variable Greeter. Damit definieren wir dann etwas weiter unten
 im Code quasi einen eigenen HTML-Tag.

 NUN: Wir importieren die notwendigen Libs und bauen eine eigene Klasse, im Java-Stil
 */

/*
import React from "react";
import ReactDOM from "react-dom";

    class Greeter extends React.Component {
        render() {
            return <h1>Hello, {this.props.message}!</h1>

        }
    }

*/
/*
 Zunächst: Finde in der index.html das Element "root" und binde den jeweiligen HTML-Code ein. Was ist aber, wenn
 ich Greeter öfter verwenden möchte? --> Dann muss dies wieder in ein eigenes <div>-Tag (siehe weiter unten)

 Durch die render-Methode wird der Inhalt an die Stelle mit "root" im index.html geschrieben
 */
/*
 ReactDOM.render(
 <Greeter message="other Guys"/>,
 document.getElementById('root'));
 */

//Import der Greeter-Komponente: Wir haben den obigen Code in eine eigene JS ausgelagert und nutzen sie hier
import React from "react";
import ReactDOM from "react-dom"

import Greeter from "./components/greeter";

import axios from "axios";

import UserList from "./components/user_list";


/*Nutzt ECS6-Syntax: Greife mit ({data}) auf das übergebene data-Objekt DIREKT zu und gebe in console data aus.
Im Grunde sorgen die geschweiften Klammern für den direkt-Zugriff...
*/
/*
axios.get('http://www.mlesniak.com')
    .then(({data}) =>
        console.log(data)
    );
*/

/*
Weiteres Experiment mit axios: Greife direkt auf die Endpoints zu, gib mir also damit das Ergebnis dieser GET-Anfrage
auf der Konsole aus
 */
/*
axios.get('/api/user')
    .then(({data}) => {
       //console.log(data);

        //Gib mir jedes Objekt einzeln aus
        for(var user of data){
            console.log(user);
        }
    });
*/

/*
Test mit Axios: Etwas über POST anfragen, aber auch bspw. das JWT-token mitgeben. Wir testen dies durch login von
User Luan
 */
axios.post('/api/user/login',
    {
        // POST data
        email: 'Luan',
        password: 'TestPassword'
    }, {
        // Configuration
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJMdWFuIiwianRpIjoiMSJ9.EXMOS1asys58SpOJRmn4pvbFj9eBQ91s7297pbBEwbJWunFQlkhYuWYoauCQXQfxue1U5wXxlmO_URILmTJ9qQ'
        }
    });

/*
ReactDOM.render(
    <div>
        <Greeter message="Person 1"/>
        <Greeter message="Person 2"/>
        <Greeter />
    </div>,
    document.getElementById('root'));

*/

ReactDOM.render(
    <div>
        <UserList />
    </div>,
    document.getElementById('root'));