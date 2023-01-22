package edu.amokrousov.pois.Security.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PassResetInfo {
    private String email;
    private String secret;
    private String password;
}
