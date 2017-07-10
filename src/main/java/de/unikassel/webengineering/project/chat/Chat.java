package de.unikassel.webengineering.project.chat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import de.unikassel.webengineering.project.user.User;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;

import java.util.Date;

/**
 * Created by Luan Hajzeraj on 08.07.2017.
 */
@Entity
public class Chat {

    @Id
    @GeneratedValue
    private Long id;

    //@ManyToOne(optional = false)
    @OneToOne
    @JoinColumn(name="AUTHOR_ID")
    private User author;

    //@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OneToOne
    @JoinColumn(name="TO_USER_ID")
    private User toUser;

    private Date timestamp;
    private String message;

    public Chat(){

    }


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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getToUser() {
        return toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }
}
