package de.unikassel.webengineering.project.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */

@Entity(name = "User_")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String email;

    //Über JSON nicht lesbar: wir schränken nutzung über access ein
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String usertext;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /*
    public Usertext getUsertext() {
        return usertext;
    }

    public void setUsertext(Usertext usertext) {
        this.usertext = usertext;
    }
    */

    public String getUsertext() {
        return usertext;
    }

    public void setUsertext(String usertext) {
        this.usertext = usertext;
    }
}
