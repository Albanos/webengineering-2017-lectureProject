package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * @author Luan Hajzeraj on 08.07.2017.
 */
@RestController
public class MessageController {
    private static final Logger LOG = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/api/message/newMessage", method = RequestMethod.POST)
    public ResponseEntity saveMessage(@RequestBody Message message){
        if(userService.isAnonymous()){
            LOG.info("The actual user is anonymus and cant send messages");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        LOG.info("Send message from={} to={}", message.getAuthor().getId(), message.getToUser().getId());
        messageService.saveMessage(message);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "api/message/all", method = RequestMethod.GET)
    public List<Message> getAllMessages(){
        return messageService.getAllMessages();
    }


    @RequestMapping(value = "/api/message/myMessages", method = RequestMethod.GET)
    public List<Message> getMessagesOfActualUser(){
        return messageService.getMessagesOfActualUser(userService.getCurrentUser());
    }


}