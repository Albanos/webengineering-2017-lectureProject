package de.unikassel.webengineering.project.user;

import org.hibernate.annotations.OrderBy;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * @author Luan Hajzeraj on 29.06.2017.
 */
public interface UserRepository extends CrudRepository<User,Long> {

    User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    List<User> findAll();

    //@Query("select u from User_ u where u.id not in :ids")
    //User findByIdNotIn(@Param("ids") Set<Long> ids);

    //@Query('SELECT u FROM User_ u Where not in :followI ORDER BY random()')
    //@OrderBy(clause = "rand()")
    //User findFirstByIdNotIn(List<Long> followI);
    //User getOneByIdNotIn(List<Long> followI);

    @Query(value = "SELECT u FROM User_ u WHERE u.id NOT IN :followI AND u.id NOT IN :dislike")
    List<User> findAllByIdNotIn(@Param("followI")List<Long> followI, @Param("dislike") List<Long> dislike);
    //User findOneByIdNotIn(List<Long> followI);
    //User findLastByIdNotIn(List<Long> followI);



}
