package com.uni_Kassel.webengineering.project.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */
@Service
public class UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public ArrayList<User> getUserList(){
        return userRepository.getUserList();
    }

    public User getUserByID(Long id){
        return userRepository.findOne(id);
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public void deleteUSerByID(Long id){
        userRepository.delete(id);
    }


}
