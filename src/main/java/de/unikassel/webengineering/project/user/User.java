package de.unikassel.webengineering.project.user;


import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */

//http://wiki.fasterxml.com/JacksonFeatureObjectIdentity
@Entity(name = "User_")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="id")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String email;

    //Über JSON nicht lesbar: wir schränken nutzung über access ein
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String usertext;


    //Nach Beispiel von:
    //https://stackoverflow.com/questions/13708271/self-referencing-manytomany-with-hibernate-and-annotations
    //User, die mich "liken"
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="Likes",
            joinColumns={@JoinColumn(name="LikeTo")},
            inverseJoinColumns={@JoinColumn(name="LikeFrom")})
    private Set<User> followMe = new HashSet<User>();

    //User, die ich selbst "like"
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="Likes",
            joinColumns={@JoinColumn(name="LikeFrom")},
            inverseJoinColumns={@JoinColumn(name="LikeTo")})
    private Set<User> followI = new HashSet<User>();


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

    //@JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsertext() {
        return usertext;
    }

    public void setUsertext(String usertext) {
        this.usertext = usertext;
    }
    //@JsonIgnore
    public Set<User> getFollowMe() {
        return followMe;
    }

    public void setFollowMe(Set<User> followMe) {
        this.followMe = followMe;
    }
    //@JsonIgnore
    public Set<User> getFollowI() {
        return followI;
    }

    public void setFollowI(Set<User> followI) {
        this.followI = followI;
    }

}
