package com.spring.restaurant.service.dto.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientLoginDto {

    private String email;
    private String password;
}
