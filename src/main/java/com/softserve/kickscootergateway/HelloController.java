package com.softserve.kickscootergateway;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequiredArgsConstructor
public class HelloController {

    @Value("classpath:/static/index.html")
    private Resource index;


    @PostConstruct
    public void init() {
        System.out.println("hello");
    }

    @GetMapping(produces = MediaType.TEXT_HTML_VALUE)
    public Resource getIndex() {
        return index;
    }


}
