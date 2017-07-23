package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Luan Hajzeraj on 03.07.2017.
 */

@Configuration
public class JWTConfiguration {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Bean
    public FilterRegistrationBean jwtFilter(){
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new JWTFilter(authenticationService, userService));

        //Alles, was aus der URL /api/*irgendwas* besteht, filtere über den JWTFilter
        bean.addUrlPatterns("/api/*");

        return bean;
    }

}
