package com.uni_Kassel.webengineering.project.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */
@RestController
public class UserController {
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    private ArrayList<User> userList = new ArrayList<>();

    @RequestMapping(value = "/api/user", method = RequestMethod.POST)
    public void addUser(@RequestBody User newUser){
        userList.add(newUser);

        LOG.info("Add user: ID={}, email={}, password={}, text={}",
                newUser.getId(), newUser.getEmail(), newUser.getPassword(),newUser.getUserText());

    }

    @RequestMapping(value = "/api/user", method = RequestMethod.GET)
    public ArrayList<User> getUserList(){

        return userList;
    }
}
