package de.unikassel.webengineering.project.user;

import java.util.HashSet;
import java.util.stream.Collectors;


/**
 * @author Luan Hajzeraj
 * Ist eine Hilfklasse für den Response des Users, bspw. nach dem Login. Diese wird benötigt, weil die
 * aktuelle Konstruktion von "Likes" und "gelikt-werden" sonst einen Überlauf erzeugen würde...
 */
public class UserResponse {
    private Long id;
    private String userName;
    private String userText;

    private HashSet<User> followI= new HashSet<>();
    private HashSet<User> followMe = new HashSet<>();
    private HashSet<User> matches = new HashSet<>();

    public UserResponse(User user){
        id= user.getId();
        userName= user.getEmail();
        userText = user.getUsertext();

        followI.addAll(user.getFollowI());
        followMe.addAll(user.getFollowMe());

        matches.addAll(followI.stream().filter(u -> followMe.contains(u)).collect(Collectors.toList()));
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserText() {
        return userText;
    }

    public HashSet<User> getFollowI() {
        return followI;
    }

    public HashSet<User> getFollowMe() {
        return followMe;
    }

    public HashSet<User> getMatches() {
        return matches;
    }
}
