package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Luan Hajzeraj on 09.07.2017.
 */
@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public void saveMessage(Message message){
        messageRepository.save(message);
    }

    public Iterable<Message> getAllMessages(){
        return messageRepository.findAll();
    }


    public Iterable<Message> getMessagesOfActualUser(User user){
        return messageRepository.findMessagesOfActualUser(user);
    }

}
