package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserResponse;
import de.unikassel.webengineering.project.user.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author Luan Hajzeraj on 03.07.2017.
 */

@Service
public class AuthenticationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserService userService;

    @Value("${authenticationService.salt}")
    private String salt;


    @Value("${authenticationService.jwt.secret}")
    private String JWTSecret;

    public static class UserToken{
        //public User user;
        public UserResponse userResponse;
        public String token;
    }


    /**
     * Service-methode für den Login des Users
     * @param email
     * @param password
     * @return Token des Users
     */
    public UserToken login(String email, String password){
        String hashedPassword = hashPassword(password);
        //User user = userService.getUserByMailAndPassword(email, hashedPassword);
        UserResponse user = userService.getUserByMailAndPassword(email, hashedPassword);


        if(user == null){
            LOG.info("User with data login={}, password={} does not exist", email, password);
            return null;
        }

        LOG.info("User with data login={}, password={} login succesful", email, password);

        //Baue das Token für den User
        String token = Jwts.builder()
                .setSubject(email)
                //Integriere die ID des Benutzers in das token
                .setId(user.getId().toString())
                .signWith(SignatureAlgorithm.HS512,JWTSecret)
                .compact();


        //Setze das generierte Token
        UserToken userToken = new UserToken();
        //userToken.user = user;
        userToken.userResponse = user;
        userToken.token = token;

        return userToken;
    }

    /**
     * Parst das JWT-Token, um es im JWT-Filter validieren zu können
     * @param jwtToken
     * @return gepastes Token
     */
    public Object parseToken(String jwtToken) {
        return Jwts.parser()
                .setSigningKey(JWTSecret)
                .parse(jwtToken)
                .getBody();
    }


    /**
     * Setzt den aktuell eingeloggten User
     * @param id
     * @param email
     */
    public void setUser(Long id, String email) {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        UsernamePasswordAuthenticationToken secAuth = new UsernamePasswordAuthenticationToken(user, null);
        SecurityContextHolder.getContext().setAuthentication(secAuth);
    }

    /**
     * Methode für Rückgabe des gehasten Passworts (einschliesslich SALT)
     * @param password
     * @return gehashtes Passwort
     */
    public String hashPassword(String password) {
        return DigestUtils.sha512Hex(salt + password);
    }


    /**
     * Methode für Rückgabe des aktuell eingeloggten Users
     * @return UserResponse des aktuellen Users
     */
    public UserResponse getActualLoggedInUser(){
        User user = userService.getCurrentUser();

        User userByID = userService.getUserByID(user.getId());
        if(userByID == null){
            LOG.info("The actual User is anonymus!");
            return null;
        }
        UserResponse userResponse = new UserResponse(userByID);

        return userResponse;
    }
}
