package de.unikassel.webengineering.project.user;

import java.util.ArrayList;
import java.util.HashSet;


/**
 * Created by Luan Hajzeraj on 16.07.2017.
 */

/**
 * Ist eine Hilfklasse für den Response des Users, bspw. nach dem Login. Diese wird benötigt, weil die
 * aktuelle Konstruktion von "Likes" und "gelikt-werden" sonst einen Überlauf erzeugen würde...
 */
public class UserResponse {
    private Long id;
    private String userName;
    private String userText;
    /*
    private HashSet<User> followI;
    private HashSet<User> followMe;
    private HashSet<User> matches;
    */
    private HashSet<User> followI;
    private HashSet<User> followMe;
    private HashSet<User> matches;

    public UserResponse(){
        /*
        followI = new HashSet<Long>();
        followMe = new HashSet<Long>();
        matches = new HashSet<Long>();
        */
        followI = new HashSet<User>();
        followMe = new HashSet<User>();
        matches = new HashSet<User>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserText() {
        return userText;
    }

    public void setUserText(String userText) {
        this.userText = userText;
    }

    public HashSet<User> getFollowI() {
        return followI;
    }

    public void setFollowI(HashSet<User> followI) {
        this.followI = followI;
    }

    public HashSet<User> getFollowMe() {
        return followMe;
    }

    public void setFollowMe(HashSet<User> followMe) {
        this.followMe = followMe;
    }

    public HashSet<User> getMatches() {
        return matches;
    }

    public void setMatches(HashSet<User> matches) {
        this.matches = matches;
    }



    //Keine ID's sondern User werden zurückgeliefert
    /*
    public HashSet<Long> getFollowI() {
        return followI;
    }

    public void setFollowI(HashSet<Long> followI) {
        this.followI = followI;
    }

    public HashSet<Long> getFollowMe() {
        return followMe;
    }

    public void setFollowMe(HashSet<Long> followMe) {
        this.followMe = followMe;
    }

    public HashSet<Long> getMatches() {
        return matches;
    }

    public void setMatches(HashSet<Long> matches) {
        this.matches = matches;
    }
    */
}
