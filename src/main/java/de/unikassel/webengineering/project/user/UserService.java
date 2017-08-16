package de.unikassel.webengineering.project.user;

import org.apache.commons.codec.digest.DigestUtils;
import org.hibernate.mapping.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Luan Hajzeraj on 29.06.2017.
 */
@Service
public class UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Value("${authenticationService.salt}")
    private String salt;

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
        //Wenn User nicht existiert: baue keinen User response, sondern gib Problem nach oben weiter, zum
        //AuthenticationController
        if(user == null){
            return null;
        }
        UserResponse userResponse = new UserResponse(user);

        return userResponse;

    }

    public void addUser(User user){
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

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

    public User getNextUnreadUser(){
        /*
        User actualLoggedInUser = getCurrentUser();

        User nowUser = userRepository.findOne(actualLoggedInUser.getId());

        Set<Long> temp2 = new HashSet<>();

        for(User u : nowUser.getFollowI()){
            temp2.add(u.getId());
        }

        User temp = userRepository.findByIdNotIn(temp2);
        */

        User me = getCurrentUser();
        User meExact = userRepository.findOne(me.getId());


        //Nur ein angemeldeter User kann liken oder disliken
        //Wird der User nicht gefunden (evtl nicht angemeldet): gebe null zurück
        if(meExact == null){
            return null;
        }
        List<Long> followI = meExact.getFollowI().stream().map(User::getId).collect(Collectors.toList());
        List<Long> dislikeI = meExact.getDislike().stream().map(User::getId).collect(Collectors.toList());
        followI.add(me.getId());


        //User oneByIdNotIn = userRepository.findFirstByIdNotIn(followI);
        //User oneByIdNotIn = userRepository.findOneByIdNotIn(followI);
        //User oneByIdNotIn = userRepository.findLastByIdNotIn(followI);
        List<User> usersIdNotIn = userRepository.findAllByIdNotInAndNotIn(followI, dislikeI);

        Random randomizer = new Random();
        User random = usersIdNotIn.get(randomizer.nextInt(usersIdNotIn.size()));

        return random;
        //return oneByIdNotIn;



    }

    public void likeTextOfUserWithID(Long id){
        User me = getCurrentUser();
        User meExact = userRepository.findOne(me.getId());

        User userThatILike = userRepository.findOne(id);

        meExact.getFollowI().add(userThatILike);

        userRepository.save(meExact);
    }

    public void dislikeTextOfUserWithID(Long id){
        User me = getCurrentUser();
        User meExact = userRepository.findOne(me.getId());

        User userThatIDislike = userRepository.findOne(id);

        meExact.getDislike().add(userThatIDislike);

        userRepository.save(meExact);
    }

    //Gibt gehastes Password zurück
    public String hashPassword(String password) {
        return DigestUtils.sha512Hex(salt + password);
    }




}
