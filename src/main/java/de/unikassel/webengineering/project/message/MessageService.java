package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Luan Hajzeraj on 09.07.2017.
 */
@Service
public class MessageService {
    private static final Logger LOG = LoggerFactory.getLogger(MessageService.class);
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    public void saveMessage(Message message){
        messageRepository.save(message);
    }

    public Iterable<Message> getAllMessages(){
        return messageRepository.findAll();
    }


    public Iterable<Message> getMessagesOfActualUser(User user){
        LOG.info("Get messages from user={}", user.getEmail());

        //Wenn der User kein JWT-Token mitsendet, ist es der annonymus-User. Dieser hat keine
        //messages
        if(userService.isAnonymous()){
            LOG.info("The User is anonymus and have not messages. Do you forget the JWT-Token?");
            return null;
        }
        return messageRepository.findMessagesOfActualUser(user);
    }

}
