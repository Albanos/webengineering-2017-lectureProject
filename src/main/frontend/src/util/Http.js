/**
 * @author Luan Hajzeraj on 06.08.2017.
 *
 * @description Zusammenfassung aller im frontend relevanten Schnittstellen zum Server
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


//Export von allen folgenden Methoden:
export {getActualUser, getAllUsers, getNextUnreadUsertext, likeUsertext, dislikeUsertext, stillOnlineCheck, login, logout, signUp, getUserByID,
sendChatMessage, getUnreadMessages};

function getUnreadMessages(partnerID){
    return axios.get('/api/message/'+partnerID);
}

function sendChatMessage(author,toUser,message){
    return axios.post('/api/message/newMessage',{
        author:{id:author},
        toUser:{id:toUser},
        message:message
    });
}


function getUserByID(id){
    return axios.get('/api/user/'+id);
}


function getActualUser() {
    return axios.get('/api/user/actualUser');
}

function getAllUsers() {
    return axios.get('/api/user');
}

function getNextUnreadUsertext() {
    return axios.get('/api/user/nextUnread');
}

function likeUsertext(id) {
    return axios.post('/api/user/like', {
        id: id
    });
}

function dislikeUsertext(id){
    return axios.post('/api/user/dislike', {
        id:id
    });
}

function stillOnlineCheck() {
    let auth = cookies.get('auth');

    if (auth) {
        //TODO: Später vielleicht den Server nach gültig des tokens fragen
        axios.defaults.headers.common['Authorization'] = auth.token;
        User.setUser(auth.user.email, auth.user.id);
        return User;
    }
}

function logout() {
    //TODO: Eventuell noch ein logout im Backend implementieren
    delete axios.defaults.headers.common['Authorization'];

    User.resetUser();

    cookies.remove('auth');

    window.updateNavbar();
}

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

        return User;
    });
}

function signUp(email, password, usertext) {
    return axios.post('/api/user', {
        email: email,
        password: password,
        usertext: usertext
    }).then(() => {
        return login(email, password);
    });
}
