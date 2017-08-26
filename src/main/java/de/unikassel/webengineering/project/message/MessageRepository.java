package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Schnittstelle zur Datenbank für Nachrichten
 *
 * @author Luan Hajzeraj on 09.07.2017.
 */
public interface MessageRepository extends CrudRepository<Message, Long> {

    List<Message> findByToUser(@Param("toUser") User user);

    List<Message> findAll();

    List<Message> findAllByAuthorAndToUserAndIsRead(User author, User toUser, boolean isRead);

    List<Message> findAllByToUserAndIsRead(User toUser, boolean isRead);
}
