package com.uni_Kassel.webengineering.project.usertext;

import com.uni_Kassel.webengineering.project.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by Luan Hajzeraj on 30.06.2017.
 */
public interface UsertextRepository extends CrudRepository<Usertext,Long>{
    /*
    @Query("Select ut from Usertext where ut.user =:user")
    Usertext findUsertextByUser(@Param("user") User user);
    */
}
