package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Created by Luan Hajzeraj on 09.07.2017.
 */
public interface MessageRepository extends CrudRepository<Message, Long> {

    List<Message> findByToUser(@Param("toUser") User user );
    List<Message> findAll();
    List<Message> findAllByAuthorAndToUserAndIsRead(User author, User toUser, boolean isRead);
}
