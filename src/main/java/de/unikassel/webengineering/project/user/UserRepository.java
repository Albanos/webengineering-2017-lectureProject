package de.unikassel.webengineering.project.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by Luan Hajzeraj on 29.06.2017.
 */
public interface UserRepository extends CrudRepository<User,Long> {

    //EMPTY NOW
    /*
    @Query("Select u from User_ u ")
    ArrayList<User> getUserList();
    */

    @Query("SELECT u FROM User_ u WHERE u.email = :email AND u.password = :password")
    User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);




}
