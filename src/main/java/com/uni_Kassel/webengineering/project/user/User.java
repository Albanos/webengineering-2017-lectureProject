package com.uni_Kassel.webengineering.project.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.uni_Kassel.webengineering.project.usertext.Usertext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.*;
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

    //Über JSON nicht lesbar: wir schränken nutzung über access ein
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    //specific user-text, for the "matching-play"
    //cascade: Ref. Integrität
    @OneToOne(mappedBy = "author", cascade = CascadeType.ALL)
    private Usertext usertext;


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

    public Usertext getUsertext() {
        return usertext;
    }

    public void setUsertext(Usertext usertext) {
        this.usertext = usertext;
    }
}
