/**
    * @author Luan Hajzeraj on 31.07.2017.
    */

class User {
    constructor() {
        this.nickname = undefined;
        this.id = -1;
    }

    isAuthenticated() {
        return this.nickname && this.id != -1;
    }

    isNotAuthenticated() {
        return !this.isAuthenticated();
    }

    setUser(nickname, id){
        this.nickname = nickname;
        this.id = id;
    }

    resetUser(){
        this.setUser(undefined,-1);
    }
}

// Singleton pattern in ES6.
export default (new User);