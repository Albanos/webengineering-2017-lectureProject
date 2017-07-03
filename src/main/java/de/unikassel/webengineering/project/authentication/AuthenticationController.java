package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.authentication.AuthenticationService;
import de.unikassel.webengineering.project.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Luan Hajzeraj on 03.07.2017.
 */

@RestController
public class AuthenticationController {
    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);

    public static class UserLogin{
        public String email;
        public String password;
    }

    public static class UserToken{
        public User user;
        public String token;
    }

    @Autowired
    private AuthenticationService service;

    @RequestMapping(value = "/api/user/login", method = RequestMethod.POST)
    public ResponseEntity<AuthenticationService.UserToken> login(@RequestBody UserLogin userLogin){
        /*
        UserToken token = new UserToken();
        Usertext usertext = new Usertext();

        token.user = new User();
        token.user.setEmail(userLogin.email);
        token.user.setId(100L);

        //Setze den Usertext exemplarisch
        usertext.setId(100L);
        usertext.setText("BeispielText");

        //Haenge den spezifischen Usertext an den neu generierten User
        token.user.setUsertext(usertext);

        token.token = "<JWT-TOKEN>";
        */

        //Suche den entsprechenden User in der Datenbank, der sich einloggen möchte
        AuthenticationService.UserToken token = service.login(userLogin.email, userLogin.password);

        //Wenn User in der Datenbank nicht existiert: gebe 401 (UNAUTHORISIERT) zurück
        if(token == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        //Existiert der User: gebe sein token und ein 200 (OK) zurück
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
