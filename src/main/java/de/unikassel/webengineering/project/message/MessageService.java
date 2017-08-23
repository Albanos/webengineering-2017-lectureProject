package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Luan Hajzeraj on 09.07.2017.
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

    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    /**
     * Methode zur Rückgabe der Nachrichten des aktuell eingeloggten Users
     * @param user
     * @return Liste von Nachrichten des aktuell eingeloggten Users
     */
    public List<Message> getMessagesOfActualUser(User user){

        //Wenn der User kein JWT-Token mitsendet, ist es der annonymus-User. Dieser hat keine
        //messages
        if(userService.isAnonymous()){
            LOG.info("The User is anonymus and have not messages");
            return null;
        }
        return messageRepository.findByToUser(user);
    }


    /**
     * Methoder zur Rückgabe von ungelesenen Nachrichten zwischen einem User und seinem Chat-Partner
     * @param me
     * @param partner
     * @return Liste von ungelesenen Nachrichten
     */
    public List<Message> getUnreadMessages(User me, User partner) {

        List<Message> unreadMessages = messageRepository.findAllByAuthorAndToUserAndIsRead(partner, me, false);

        for(Message m : unreadMessages){
            m.setRead(true);
            messageRepository.save(m);
        }

        return unreadMessages;
    }

    /**
     * Methoder zur Rückgabe aller ungelesenen Nachrichten (Chat-Partner unabhängig)
     * @param me
     * @return Liste von ungelesenen Nachrichten
     */
    public List<Message> getUnreadMessages(User me) {
        return messageRepository.findAllByToUserAndIsRead(me, false);
    }
}
