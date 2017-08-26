package de.unikassel.webengineering.project.user;

import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;
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


    /**
     * Methode zur Rückgabe aller User in der Datenbank
     *
     * @return Liste aller User
     */
    public List<User> getUserList() {
        //return userRepository.getUserList();
        return userRepository.findAll();
    }

    /**
     * Methode zur Rückgabe eines bestimmten Users aus der Datenbank (mittels User-ID)
     *
     * @param id
     * @return User
     */
    public User getUserByID(Long id) {
        return userRepository.findOne(id);
    }

    /**
     * Methode zur Rückgabe eines bestimmten Users aus der Datenbank (mittels email und PW)
     *
     * @param email
     * @param password
     * @return User
     */
    public UserResponse getUserByMailAndPassword(String email, String password) {
        //return userRepository.findByEmailAndPassword(email, password);

        User user = userRepository.findByEmailAndPassword(email, password);
        //Wenn User nicht existiert: baue keinen User response, sondern gib Problem nach oben weiter, zum
        //AuthenticationController
        if (user == null) {
            return null;
        }

        return new UserResponse(user);

    }

    /**
     * Methode zum hinzufügen eines neuen Users zur Datenbank
     *
     * @param user
     */
    public void addUser(User user) {
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
    }

    /**
     * Methode zum Löschen eines bestimmten Users aus der Datenbank
     *
     * @param id
     */
    public void deleteUSerByID(Long id) {
        userRepository.delete(id);
    }

    //Gibt den Aktuell angemeldeten User zurück
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


    /**
     * Methode zum setzen des aktuellen Users auf "anonymus"
     */
    public void setAnonymous() {
        setCurrentUser(-1L, "<anonymous>");
    }

    /**
     * Methode zum setzen des aktuell eingeloggten Users
     *
     * @param id
     * @param email
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
     * Methode zum Prüfen, ob der aktuelle User "anonymus" ist oder nicht
     *
     * @return true, wenn User authentifiziert ist
     */
    public boolean isAnonymous() {
        return getCurrentUser().getId() == -1L;
    }


    /**
     * Methode zur Rückgabe eines noch ungelesenen/nicht kategorisierten User-textes
     *
     * @return User
     */
    public User getNextUnreadUser() {

        User me = getCurrentUser();
        User meExact = userRepository.findOne(me.getId());


        //Nur ein angemeldeter User kann liken oder disliken
        //Wird der User nicht gefunden (evtl nicht angemeldet): gebe null zurück
        if (meExact == null) {
            return null;
        }
        List<Long> followI = meExact.getFollowI().stream().map(User::getId).collect(Collectors.toList());
        List<Long> dislikeI = meExact.getDislike().stream().map(User::getId).collect(Collectors.toList());
        followI.add(me.getId());

        List<User> usersIdNotIn = userRepository.findAllByIdNotIn(followI, dislikeI);


        if (usersIdNotIn.size() > 0) {
            Random randomizer = new Random();

            return usersIdNotIn.get(randomizer.nextInt(usersIdNotIn.size()));
        }

        return null;

    }

    /**
     * Methode zum "liken" eines Usertextes: eintragen in die like-liste des aktuell eingeloggten Users
     *
     * @param id
     */
    public void likeTextOfUserWithID(Long id) {
        User me = getCurrentUser();
        User meExact = userRepository.findOne(me.getId());

        User userThatILike = userRepository.findOne(id);

        meExact.getFollowI().add(userThatILike);

        userRepository.save(meExact);
    }


    /**
     * Methode zum "disliken" eines Usertextes: eintragen in die dislike-liste des aktuell eingeloggten Users
     *
     * @param id
     */
    public void dislikeTextOfUserWithID(Long id) {
        User me = getCurrentUser();
        User meExact = userRepository.findOne(me.getId());

        User userThatIDislike = userRepository.findOne(id);

        meExact.getDislike().add(userThatIDislike);

        userRepository.save(meExact);
    }

    /**
     * Methode zur Rückgabe des gehasten Passworts eines Users
     *
     * @param password
     * @return Passwort als hash-wert
     */
    public String hashPassword(String password) {
        return DigestUtils.sha512Hex(salt + password);
    }


}
