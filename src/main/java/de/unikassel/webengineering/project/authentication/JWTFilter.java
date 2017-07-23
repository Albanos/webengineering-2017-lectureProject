package de.unikassel.webengineering.project.authentication;

import de.unikassel.webengineering.project.authentication.AuthenticationService;
import de.unikassel.webengineering.project.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Luan Hajzeraj on 03.07.2017.
 */
public class JWTFilter extends GenericFilterBean {
    private static final Logger LOG = LoggerFactory.getLogger(JWTFilter.class);

    private AuthenticationService authenticationService;
    private UserService userService;

    public JWTFilter(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        //Liefert mir den Teil des Headers, der unter Authorization steht
        String auth = httpServletRequest.getHeader("Authorization");

        //Entspricht das Token nicht dem zurück-gelieferten: Gebe ein 401 zurück
        if(!StringUtils.startsWithIgnoreCase(auth,"Bearer ")){
            //LOG.warn("No authorization token submitted!");

            // Allow requests without a token.
            LOG.debug("No token provided, setting to anonymous user");
            userService.setAnonymous();
            filterChain.doFilter(request, response);

            //httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }

        //Ist das token valide: Entpacke den Token content
        String token = auth.substring(7);
        try {
            Claims body = (Claims) authenticationService.parseToken(token);
            LOG.info("Successful login from={} with ID={}", body.getSubject(), body.getId());

            userService.setCurrentUser(Long.parseLong(body.getId()), body.getSubject());
            filterChain.doFilter(request, response);

            if(body.getId() == null){
                LOG.info("ID from User={} is null. Do you forget to send the JWT-Token!?", body.getSubject());
            }

            //Setze im Request den User als aktuellen/aktuell angemeldeten User
            //authenticationService.setUser(Long.parseLong(body.getId()), body.getSubject());

//            filterChain.doFilter(request, response);
        } catch (SignatureException e) {
            LOG.warn("Token is invalid: {}", token);
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

    }
}
