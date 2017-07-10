package de.unikassel.webengineering.project.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Luan Hajzeraj on 09.07.2017.
 */
@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public void saveMessage(Chat chat){
        chatRepository.save(chat);
    }

    public Iterable<Chat> getAllChats(){
        return chatRepository.findAll();
    }
}
