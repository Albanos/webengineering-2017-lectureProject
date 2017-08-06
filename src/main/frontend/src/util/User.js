/**
    * @author Luan Hajzeraj on 31.07.2017.
    */

class User {
    constructor() {
        this.email = undefined;
        this.id = -1;
    }

    isAuthenticated() {
        return this.email && this.id != -1;
    }

    isNotAuthenticated() {
        return !this.isAuthenticated();
    }

    setUser(email, id){
        this.email = email;
        this.id = id;
    }

    resetUser(){
        this.setUser(undefined,-1);
    }
}

// Singleton pattern in ES6.
export default (new User);