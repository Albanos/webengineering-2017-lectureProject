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

    /**
     * JWT-Filter für jedwede Anfrage mit "/api/..."
     *
     * @return generierter Filter
     */
    @Bean
    public FilterRegistrationBean jwtFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new JWTFilter(authenticationService, userService));

        bean.addUrlPatterns("/api/*");

        return bean;
    }

}
