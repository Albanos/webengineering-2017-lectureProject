package de.unikassel.webengineering.project.user;

import java.util.ArrayList;
import java.util.HashSet;


/**
 * Created by Luan Hajzeraj on 16.07.2017.
 */
public class UserResponse {
    private Long id;
    private String userName;
    private String userText;
    //private ArrayList followI;
    //private ArrayList followMe;
    private HashSet followI;
    private HashSet followMe;
    private HashSet matches;

    public UserResponse(){
        //followI = new ArrayList();
        //followMe = new ArrayList();
        followI = new HashSet();
        followMe = new HashSet();
        matches = new HashSet();
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

    /*
    public ArrayList getFollowI() {
        return followI;
    }

    public void setFollowI(ArrayList followI) {
        this.followI = followI;
    }

    public ArrayList getFollowMe() {
        return followMe;
    }

    public void setFollowMe(ArrayList followMe) {
        this.followMe = followMe;
    }
    */

    public HashSet getFollowI() {
        return followI;
    }

    public void setFollowI(HashSet followI) {
        this.followI = followI;
    }

    public HashSet getFollowMe() {
        return followMe;
    }

    public void setFollowMe(HashSet followMe) {
        this.followMe = followMe;
    }

    public HashSet getMatches() {
        return matches;
    }

    public void setMatches(HashSet matches) {
        this.matches = matches;
    }
}
