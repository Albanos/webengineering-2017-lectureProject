package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserResponse;
import de.unikassel.webengineering.project.user.UserService;
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

    public static class UserLogin {
        public String email;
        public String password;
    }

    public static class UserToken {
        public User user;
        public String token;
    }

    @Autowired
    private AuthenticationService service;

    @Autowired
    private UserService userService;


    /**
     * REST-Schnittstelle für Userlogin
     *
     * @param userLogin
     * @return Status 200 mit User-token im header oder Status 401
     */
    @RequestMapping(value = "/api/user/login", method = RequestMethod.POST)
    public ResponseEntity<UserResponse> login(@RequestBody UserLogin userLogin) {

        AuthenticationService.UserToken tokenResponse = service.login(userLogin.email, userLogin.password);

        //Wenn User in der Datenbank nicht existiert: gebe 401 (UNAUTHORISIERT) zurück
        if (tokenResponse == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        //Existiert der User: gebe sein token und ein 200 (OK) zurück
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tokenResponse.token);


        return new ResponseEntity<UserResponse>(tokenResponse.userResponse, headers, HttpStatus.OK);
    }

    /**
     * Gibt den aktuell eingeloggten User zurück
     *
     * @return Status 200 mit UserResponse oder Status 404
     */
    @RequestMapping(value = "/api/user/actualUser", method = RequestMethod.GET)
    public ResponseEntity<UserResponse> getActualLoggedInUser() {
        UserResponse userResponse = service.getActualLoggedInUser();
        if (userResponse == null) {
            return new ResponseEntity<UserResponse>(userResponse, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
        }

    }

}
