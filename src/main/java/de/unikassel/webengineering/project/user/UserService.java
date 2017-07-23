package de.unikassel.webengineering.project.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

/**
 * @author Luan Hajzeraj on 29.06.2017.
 */
@Service
public class UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public List<User> getUserList(){
        //return userRepository.getUserList();
        return userRepository.findAll();
    }

    public User getUserByID(Long id){
        //return userRepository.findOne(id);
        return userRepository.findOne(id);
    }

    //public User getUserByMailAndPassword(String email, String password){
    public UserResponse getUserByMailAndPassword(String email, String password){
        //return userRepository.findByEmailAndPassword(email, password);

        User user = userRepository.findByEmailAndPassword(email,password);
        UserResponse userResponse = new UserResponse(user);

        return userResponse;

    }

    public void addUser(User user){

        userRepository.save(user);
    }

    public void deleteUSerByID(Long id){
        userRepository.delete(id);
    }

    //Gibt den Aktuell angemeldeten User zurück
    public User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


    /**
     * Sets the current user to anonymous.
     */
    public void setAnonymous() {
        setCurrentUser(-1L, "<anonymous>");
    }

    /**
     * Set a user for the current request.
     *
     * @param id    user id
     * @param email user email
     */
    public void setCurrentUser(Long id, String email) {
        LOG.debug("Setting user context. id={}, user={}", id, email);
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        UsernamePasswordAuthenticationToken secAuth = new UsernamePasswordAuthenticationToken(user, null);
        SecurityContextHolder.getContext().setAuthentication(secAuth);
    }

    /**
     * Check if the current user is not authenticated.
     *
     * @return true if the user is not authenticated.
     */
    public boolean isAnonymous() {
        return getCurrentUser().getId() == -1L;
    }



}
