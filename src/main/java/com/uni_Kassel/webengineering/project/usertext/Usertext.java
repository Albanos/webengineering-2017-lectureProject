package com.uni_Kassel.webengineering.project.usertext;

import com.uni_Kassel.webengineering.project.user.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Luan Hajzeraj on 30.06.2017.
 */
@Entity
public class Usertext {
    @Id
    @GeneratedValue
    private Long id;

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
