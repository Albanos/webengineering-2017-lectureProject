package de.unikassel.webengineering.project.message;

import de.unikassel.webengineering.project.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Created by Luan Hajzeraj on 09.07.2017.
 */
public interface MessageRepository extends CrudRepository<Message, Long> {
    @Query("SELECT m FROM Message_ m WHERE m.toUser = :toUser")
    Iterable<Message> findMessagesOfActualUser(@Param("toUser") User user );
}
