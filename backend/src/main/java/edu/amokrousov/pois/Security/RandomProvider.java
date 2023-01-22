package edu.amokrousov.pois.Security;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component
public class RandomProvider {
    private static final String SYMBOLS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int DEFAULT_LENGTH = 15;

    private final Random random;

    public RandomProvider() {
        this.random = new SecureRandom();
    }

    public String generate(int length) {
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(SYMBOLS.charAt(random.nextInt(SYMBOLS.length())));
        }
        return new String(password);
    }

    public String generate() {
        return generate(DEFAULT_LENGTH);
    }
}
