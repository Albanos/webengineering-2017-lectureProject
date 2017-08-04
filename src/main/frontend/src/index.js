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

//"Globales" setzen des JWT-Tokens
//axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJMdWFuIiwianRpIjoiMSJ9.EXMOS1asys58SpOJRmn4pvbFj9eBQ91s7297pbBEwbJWunFQlkhYuWYoauCQXQfxue1U5wXxlmO_URILmTJ9qQ'
//axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSb3ZpIiwianRpIjoiMiJ9.dU4mQ86RR6Oujg-5mGbFVCuzxOy3YhyqfRlaGD3j-2sGWHRa3UklrFq8qrvqsX8mPAloGg8qqaQm7cV355iYJQ'

//axios.post('/api/user/login',
  //  {
        // POST data
    //    email: 'Luan',
     //   password: 'TestPassword'
    /*
    }, {
        // Configuration
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJMdWFuIiwianRpIjoiMSJ9.EXMOS1asys58SpOJRmn4pvbFj9eBQ91s7297pbBEwbJWunFQlkhYuWYoauCQXQfxue1U5wXxlmO_URILmTJ9qQ'
        }
     */
    //
// });

/*
ReactDOM.render(
    <div>
        <Greeter message="Person 1"/>
        <Greeter message="Person 2"/>
        <Greeter />
    </div>,
    document.getElementById('root'));

*/

import React from "react";
import {CookiesProvider} from "react-cookie";
import ReactDOM from "react-dom"
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";

import Authentication from "./components/authentication"
import UserList from "./components/user_list";
import CurrentUser from "./components/current_user"
import User from "./util/User"
import MatchGame from "./components/match_game"
import SignUp from "./components/signUp"


ReactDOM.render(
    // This component will insert a property cookies to each child.
    <CookiesProvider>

        <Router>
            <div>
                <div className="menu">
                    <Link to="/user/login">Login</Link>

                    <Link to="/user/actual">Actual User</Link>

                    <Link to="/user/all">All Users</Link>

                    <Link to="/matchgame">Matchgame</Link>
                </div>
                <Switch>
                    {/*Authentication*/}
                    <Route path="/user/login" component={Authentication}/>

                    {/*actual logged in user*/}
                    <Route path="/user/actual" component={CurrentUser}/>

                    {/*List of all users*/}
                    <Route path="/user/all" component={UserList}/>

                    {/*Matchgame*/}
                    <Route path="/matchgame" component={MatchGame}/>

                    {/* Sign-Up*/}
                    <Route path="/signUp" component={SignUp}/>

                    {/*Default route: Weggelassen... Syntax:<Route path="/" component={PostList}/>*/}
                </Switch>
            </div>
        </Router>

    </CookiesProvider>,
    document.getElementById('root'));