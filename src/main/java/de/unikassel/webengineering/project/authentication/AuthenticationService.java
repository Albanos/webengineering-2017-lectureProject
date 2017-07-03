package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Luan Hajzeraj on 03.07.2017.
 */

@Service
public class AuthenticationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserService userService;

    //Start-Secret für das JWT-Token
    String secret = "Severus Snape was a good guy!";

    public static class UserToken{
        public User user;
        public String token;
    }

    public UserToken login(String email, String password){
        User user = userService.getUserByMailAndPassword(email, password);

        if(user == null){
            LOG.info("User with data login={}, password={} does not exist", email, password);
            return null;
        }

        LOG.info("User with data login={}, password={} login succesful", email, password);

        //Baue das Token für den User
        String token = Jwts.builder()
                .setSubject(email)
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();


        //Setze das generierte Token
        UserToken userToken = new UserToken();
        userToken.user = user;
        userToken.token = token;

        return userToken;
    }

    //Parse das Token zu einem String, um es im JWTFilter auf validität prüfen zu können
    public Object parseToken(String jwtToken) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parse(jwtToken)
                .getBody();
    }
}
