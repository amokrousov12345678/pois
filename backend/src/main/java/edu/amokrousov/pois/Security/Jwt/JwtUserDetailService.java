package edu.amokrousov.pois.Security.Jwt;

import edu.amokrousov.pois.Entity.User;
import edu.amokrousov.pois.Security.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtUserDetailService implements UserDetailsService {
    @Autowired
    private AuthUserRepository authUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> userOptional = authUserRepository.findByUsername(username);

        if (!userOptional.isPresent()) {
            throw new RuntimeException("Username " + username + " not found");
        }
        User user = userOptional.get();
        JwtUser jwtUser = JwtUserFactory.create(user);
        return jwtUser;
    }
}

