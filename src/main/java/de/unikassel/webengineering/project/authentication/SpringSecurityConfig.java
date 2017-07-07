package de.unikassel.webengineering.project.authentication;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by Luan Hajzeraj on 07.07.2017.
 */
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
    //Erlaube grundsätzlich alles
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("*").anonymous()
                .and()
                .csrf().disable();
    }

}
