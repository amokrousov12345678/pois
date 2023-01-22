package edu.amokrousov.pois.Security;

import edu.amokrousov.pois.Entity.User;
import edu.amokrousov.pois.Security.Dto.Credentials;
import edu.amokrousov.pois.Security.Dto.RegisterInfo;
import edu.amokrousov.pois.Security.Jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AuthUserRepository authUserRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    JavaMailSender emailSender;

    @Autowired
    RandomProvider randomProvider;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Value("${frontend.baseUrl}")
    private String frontendBaseUrl;

    public String generateToken(Credentials credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        Optional<User> userOptional = authUserRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return jwtTokenProvider.createToken(username, user.getPrivileges());
        }
        throw new AuthException("User not found");
    }

    @Transactional
    public void register(RegisterInfo registerInfo) {
        User user = new User();
        user.setUsername(registerInfo.getUsername());
        user.setEmail(registerInfo.getEmail());
        sendResetPasswordLink(user);
        authUserRepository.save(user);
    }

    @Transactional
    private void sendResetPasswordLink(User user) {
        String secret = randomProvider.generate();
        user.setLastSecret(secret);
        user.setLastRecoveryAttempt(new Date());
        authUserRepository.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Сброс пароля");
        try {
            message.setText("Если вы зарегистрировались/запросили сброс пароля, пройдите по ссылке "
                    + frontendBaseUrl + "passReset?email=" + URLEncoder.encode(user.getEmail(), "UTF-8")
                    + "&secret=" + URLEncoder.encode(secret, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }
        emailSender.send(message);
    }

    @Transactional
    public void sendResetPasswordLinkByEmail(String email) {
        Optional<User> optionalUser = authUserRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return;
        }
        User user = optionalUser.get();
        sendResetPasswordLink(user);
    }

    @Transactional
    public void resetPassword(String email, String secret, String password) {
        Optional<User> optionalUser = authUserRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return;
        }

        User user = optionalUser.get();
        if (!user.getLastSecret().equals(secret)) {
            return;
        }

        if (user.getLastRecoveryAttempt() == null) {
            return;
        }

        long deltaTime = System.currentTimeMillis() - user.getLastRecoveryAttempt().getTime();
        long MILLIS_IN_DAY = 24L * 60 * 60 * 1000;
        if (deltaTime >= MILLIS_IN_DAY) {
            return;
        }
        user.setLastRecoveryAttempt(null);
        user.setPassword(passwordEncoder.encode(password));
    }
}
