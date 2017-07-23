package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.authentication.AuthenticationService;
import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Luan Hajzeraj on 03.07.2017.
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
    public ResponseEntity<UserResponse> login(@RequestBody UserLogin userLogin){

        //Suche den entsprechenden User in der Datenbank, der sich einloggen möchte
        AuthenticationService.UserToken tokenResponse = service.login(userLogin.email, userLogin.password);

        //Wenn User in der Datenbank nicht existiert: gebe 401 (UNAUTHORISIERT) zurück
        if(tokenResponse == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        //Existiert der User: gebe sein token und ein 200 (OK) zurück
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","Bearer "+tokenResponse.token);

        return new ResponseEntity<UserResponse>(tokenResponse.userResponse ,headers, HttpStatus.OK);
    }
}
