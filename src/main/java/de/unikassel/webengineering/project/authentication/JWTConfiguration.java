package de.unikassel.webengineering.project.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Luan Hajzeraj on 03.07.2017.
 */

@Configuration
public class JWTConfiguration {
    @Autowired
    private AuthenticationService authenticationService;

    @Bean
    public FilterRegistrationBean jwtFilter(){
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new JWTFilter(authenticationService));

        //Alles, was aus der URL /api/*irgendwas* besteht, filtere über den JWTFilter
        bean.addUrlPatterns("/api/*");

        return bean;
    }
}
