package com.uni_Kassel.webengineering.project.user;


import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */

public class User {

    private Long id;

    private String email;
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
