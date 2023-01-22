package edu.amokrousov.pois.Security;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
public class SpringDataRestCustomization extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.getCorsRegistry().addMapping("/**")
                .allowedOrigins("http://localhost:9000")
                .allowedMethods("GET", "PATCH", "POST", "DELETE", "OPTIONS");
    }
}