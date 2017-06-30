package com.uni_Kassel.webengineering.project.usertext;

import com.uni_Kassel.webengineering.project.user.User;
import com.uni_Kassel.webengineering.project.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Luan Hajzeraj on 30.06.2017.
 */
@Service
public class UsertextService {

    @Autowired
    private UsertextRepository usertextRepository;

    @Autowired
    private UserRepository userRepository;

    /*
    public Usertext getUsertextByUser(User user){
        return usertextRepository.findUsertextByUser(user);
    }
    */
    public void addUsertextToUser(User user,String usertext){
        Usertext ut = new Usertext();
        ut.setText(usertext);
        ut.setAuthor(user);

        usertextRepository.save(ut);
    }
}
