package com.uni_Kassel.webengineering.project.usertext;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uni_Kassel.webengineering.project.user.User;

import javax.persistence.*;

/**
 * Created by Luan Hajzeraj on 30.06.2017.
 */
@Entity
public class Usertext {
    public Usertext(){

    }

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUTHOR")
    @JsonIgnore
    private User author;

    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
