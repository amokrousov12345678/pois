package edu.amokrousov.pois.Security;

import edu.amokrousov.pois.Security.Dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuthController {
    @Autowired
    private AuthService authService;

    @PreAuthorize("permitAll()")
    @PostMapping("/api/login")
    public AuthToken login(@RequestBody Credentials credentials) {
        String token = authService.generateToken(credentials);
        return new AuthToken(token);
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/api/register")
    public void register(@RequestBody RegisterInfo registerInfo) {
        authService.register(registerInfo);
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/api/passRecover")
    public void register(@RequestBody EmailDto emailDto) {
        authService.sendResetPasswordLinkByEmail(emailDto.getEmail());
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/api/passReset")
    public void register(@RequestBody PassResetInfo passResetInfo) {
        authService.resetPassword(passResetInfo.getEmail(), passResetInfo.getSecret(),
                passResetInfo.getPassword());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/profile/privileges")
    public List<String> getMyPrivileges() {
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities();
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

}
