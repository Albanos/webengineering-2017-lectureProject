package com.uni_Kassel.webengineering.project.user;

import com.uni_Kassel.webengineering.project.usertext.Usertext;
import com.uni_Kassel.webengineering.project.usertext.UsertextRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */
@RestController
public class UserController {
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    private ArrayList<User> userList = new ArrayList<>();

    @Autowired
    private UserService userService;

    @Autowired
    private UsertextRepository usertextRepository;

    @RequestMapping(value = "/api/user", method = RequestMethod.POST)
    public void addUser(@RequestBody User newUser, @RequestBody Usertext usertext){
        userService.addUser(newUser, usertext);

        /*
        LOG.info("Add user: ID={}, email={}, password={}, text={}",
                newUser.getId(), newUser.getEmail(), newUser.getPassword(),newUser.getUserText());
        */
    }

    @RequestMapping(value = "/api/user", method = RequestMethod.GET)
    public ArrayList<User> getUserList(){
        LOG.info("Return the List of all persistent users");
        return userService.getUserList();
    }

    @RequestMapping(value = "/api/user/{id}", method = RequestMethod.GET)
    public User getUserByEmailAndPassword(@PathVariable Long id){
        LOG.info("Return the User with ID={}", id);
        return userService.getUserByID(id);
    }

    @RequestMapping(value = "/api/user/{id}", method = RequestMethod.DELETE)
    public void deleteUserByID(@PathVariable Long id){
        LOG.info("Delete USer with ID={}", id);
        userService.deleteUSerByID(id);
    }
}
