package edu.amokrousov.pois.Security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class AuthException extends RuntimeException {
    public AuthException() {
    }

    public AuthException(String message) {
        super(message);
    }
}
