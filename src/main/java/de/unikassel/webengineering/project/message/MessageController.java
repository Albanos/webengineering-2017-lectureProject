package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import de.unikassel.webengineering.project.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controller-Schnittstelle für alle Nachrichten
 *
 * @author Luan Hajzeraj on 08.07.2017.
 */


@RestController
public class MessageController {
    private static final Logger LOG = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;


    /**
     * Methode zum versenden einer neuen Nachricht
     * @param message
     * @return Status 200 oder Status 401
     */
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

    /**
     * Methode zur Rückgabe aller Nachrichten
     * @return Liste mit allen Nachrichten
     */
    @RequestMapping(value = "api/message/all", method = RequestMethod.GET)
    public List<Message> getAllMessages(){
        return messageService.getAllMessages();
    }


    /**
     * Methoder zur Rückgabe von allen Nachrichten des aktuell eingeloggten Users
     * @return Liste von allen Nachrichten des aktuellen Users
     */
    @RequestMapping(value = "/api/message/myMessages", method = RequestMethod.GET)
    public List<Message> getMessagesOfActualUser(){
        return messageService.getMessagesOfActualUser(userService.getCurrentUser());
    }


    /**
     * Methoder zur Rückgabe aller ungelesenen Nachrichten eines bestimmten Chat-Partners
     * @param id
     * @return Liste von ungelesenen Nachrichten mit einem bestimmten Partner
     */
    @RequestMapping(value = "/api/message/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<Message>> getUnreadMessagesByID(@PathVariable Long id){
        User me = userService.getCurrentUser();

        if(me == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User meExact = userService.getUserByID(me.getId());
        User partner = userService.getUserByID(id);


        if(partner == null || !meExact.validateMatch(partner)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Message> unreadMessages = messageService.getUnreadMessages(meExact,partner);

        return new ResponseEntity<>(unreadMessages, HttpStatus.OK);
    }

    /**
     * Methoder zur Rückgbabe von generell ungelesenen Nachrichten (Chat-Partner unabhängig)
     * @return Liste von ungelesenen Nachrichten
     */
    @RequestMapping(value = "/api/message/", method = RequestMethod.GET)
    public ResponseEntity<List<Message>> getUnreadMessages(){
        User me = userService.getCurrentUser();

        if(me == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User meExact = userService.getUserByID(me.getId());

        List<Message> unreadMessages = messageService.getUnreadMessages(meExact);

        return new ResponseEntity<>(unreadMessages, HttpStatus.OK);
    }

}