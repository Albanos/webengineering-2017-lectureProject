package com.uni_Kassel.webengineering.project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Luan Hajzeraj on 28.06.2017.
 */
@RestController
public class MainController {
    private static final Logger LOG = LoggerFactory.getLogger(MainController.class);

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public void helloWorld(){
        LOG.info("Iam working!!");
    }
}
