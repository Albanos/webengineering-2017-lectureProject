package de.unikassel.webengineering.project.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author Luan Hajzeraj on 29.06.2017.
 */
public interface UserRepository extends CrudRepository<User,Long> {

    User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    List<User> findAll();



}
