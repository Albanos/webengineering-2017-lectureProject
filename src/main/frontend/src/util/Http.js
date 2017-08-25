/**
 * Hilfskomponente: Bündelt jedwede Kommunikation mit Backend
 *
 * @author Luan Hajzeraj on 06.08.2017.
 */


import axios from 'axios';
import User from './User';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


//Allgemeine response-error-handler/'response-unterbrecher': Gibt im error-case von ALLEN RESPONSES 
// die entsprechnde Meldung
// From: https://github.com/mzabriskie/axios#interceptors
axios.interceptors.response.use(undefined, (error) => {
    if (error.status === 401) {
        console.error('401: User is unauthorized');
    }
    else {
        console.error('Fehler: Computer sagt nein...');
    }
    console.error(error.statusText);

    return Promise.reject(error);
});


export {
    getActualUser,
    getNextUnreadUsertext,
    likeUsertext,
    dislikeUsertext,
    stillOnlineCheck,
    login,
    logout,
    signUp,
    getUserByID,
    sendChatMessage,
    getUnreadMessages
};

/**
 * Methode zum Abrufen von ungelesenen Nachrichten: Entweder alle ungelesenen oder von einem best. Partner
 * @param {undefined|Number} partnerID - Für alle Nachrichten keine partnerID übergeben
 * @returns {AxiosPromise} - Besteht aus einem Array von Messages
 */
function getUnreadMessages(partnerID) {
    return axios.get('/api/message/' + (partnerID ? partnerID : ''));
}

/**
 * Sendet eine neue Nachricht zu einem bestimmten User
 * @param {Number} author - ID des Absenders
 * @param {Number} toUser - ID des Empfängers
 * @param {String} message - Eigentliche Nachricht
 * @returns {AxiosPromise|*}
 */
function sendChatMessage(author, toUser, message) {
    return axios.post('/api/message/newMessage', {
        author: {id: author},
        toUser: {id: toUser},
        message: message
    });
}

function getUserByID(id) {
    return axios.get('/api/user/' + id);
}

function getActualUser() {
    return axios.get('/api/user/actualUser');
}

/**
 * Methode zum abrufen eines nicht-kategorisierten Usertextes zum liken oder disliken
 * @returns {AxiosPromise} - User
 */
function getNextUnreadUsertext() {
    return axios.get('/api/user/nextUnread');
}

function likeUsertext(id) {
    return axios.post('/api/user/like', {
        id: id
    });
}

function dislikeUsertext(id) {
    return axios.post('/api/user/dislike', {
        id: id
    });
}

/**
 * Methode liest aus Cookie den aktuellen User und setzt ihn
 * @returns {User|undefined}
 */
function stillOnlineCheck() {
    let auth = cookies.get('auth');

    if (auth) {
        //TODO: Später vielleicht den Server nach gültig des tokens fragen
        axios.defaults.headers.common['Authorization'] = auth.token;
        User.setUser(auth.user.nickname, auth.user.id);
        return User;
    }
}

/**
 * Methode zum durchführen eines logouts (am backend)
 */
function logout() {
    //TODO: Eventuell noch ein logout im Backend implementieren
    delete axios.defaults.headers.common['Authorization'];

    User.resetUser();

    cookies.remove('auth');

    window.updateNavbar();
    window.updateNewMessagePopUp();
}

/**
 * Methode zum durchführen eines logins am backend
 * @param {String} email
 * @param  {String} password
 * @returns {Promise.<User>}
 */
function login(email, password) {
    return axios.post('/api/user/login', {
        email: email,
        password: password
    }).then(response => {
        axios.defaults.headers.common['Authorization'] = response.headers.authorization;
        User.setUser(response.data.userName, response.data.id);

        cookies.set('auth', {
            token: response.headers.authorization,
            user: User
        }, {path: '/'});

        window.updateNavbar();

        //Listener für neue Nachrichten
        window.updateNewMessagePopUp();

        return User;
    });
}

/**
 * Methode zum Anlegen eines Benutzerkontos mit anschliessendem Login
 * @param {String} email
 * @param {String} password
 * @param {String} usertext
 * @returns {Promise.<User>}
 */
function signUp(email, password, usertext) {
    return axios.post('/api/user', {
        email: email,
        password: password,
        usertext: usertext
    }).then(() => {
        return login(email, password);
    });
}
