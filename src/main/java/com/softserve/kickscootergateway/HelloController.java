package com.softserve.kickscootergateway;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HelloController {

    @Value("classpath:/static/index.html")
    private Resource index;

    @GetMapping(produces = MediaType.TEXT_HTML_VALUE, value = {"/", "/sign-in/**", "/sign-up/**", "/greeting/**",
            "/activation/**"})
    public Resource getIndex() {
        return index;
    }
}
