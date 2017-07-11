package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by Luan Hajzeraj on 08.07.2017.
 */
@RestController
public class MessageController {
    private static final Logger LOG = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/api/message/newMessage", method = RequestMethod.POST)
    public void saveMessage(@RequestBody Message message){
        LOG.info("id={}, author={}, empf={}, time={}, message={}", message.getId(), message.getAuthor().toString(), message.getToUser(),
                message.getTimestamp(), message.getMessage());

        messageService.saveMessage(message);
    }

    @RequestMapping(value = "api/message/all", method = RequestMethod.GET)
    public Iterable<Message> getAllMessages(){
        return messageService.getAllMessages();
    }


    @RequestMapping(value = "/api/message/myMessages", method = RequestMethod.GET)
    public Iterable<Message> getMessagesOfActualUsser(){
        return messageService.getMessagesOfActualUser(userService.getCurrentUser());
    }


}