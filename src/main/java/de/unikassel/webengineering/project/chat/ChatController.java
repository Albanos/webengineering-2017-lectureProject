package de.unikassel.webengineering.project.chat;

import de.unikassel.webengineering.project.user.UserController;
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
public class ChatController {
    private static final Logger LOG = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ChatService chatService;

    @RequestMapping(value = "/api/chat/newMessage", method = RequestMethod.POST)
    public void saveMessage(@RequestBody Chat chat){
        LOG.info("id={}, author={}, empf={}, time={}, message={}", chat.getId(), chat.getAuthor().toString(), chat.getToUser(),
                chat.getTimestamp(), chat.getMessage());

        chatService.saveMessage(chat);
    }

    @RequestMapping(value = "api/chat/all", method = RequestMethod.GET)
    public Iterable<Chat> getAllChats(){
        return chatService.getAllChats();
    }

}