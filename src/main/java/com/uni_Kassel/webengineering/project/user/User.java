package com.uni_Kassel.webengineering.project.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */

@Entity(name = "User_")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String email;

    //Dont return the password of User in plain text
    @JsonIgnore
    private String password;

    //specific user-text, for the "matching-play"
    private String userText;


    public String getUserText() {
        return userText;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
