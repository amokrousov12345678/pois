package edu.amokrousov.pois.Security.Jwt;

import edu.amokrousov.pois.Entity.Privilege;
import edu.amokrousov.pois.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public final class JwtUserFactory {
    public JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                mapToGrantedAuthorities(user.getPrivileges()));
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(Set<Privilege> userPrivileges) {
        return StreamSupport.stream(userPrivileges.spliterator(), false)
                .map(privilege -> new SimpleGrantedAuthority(privilege.getName()))
                .collect(Collectors.toList());
    }
}
