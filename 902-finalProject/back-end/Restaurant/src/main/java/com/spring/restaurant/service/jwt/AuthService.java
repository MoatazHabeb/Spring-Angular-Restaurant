package com.spring.restaurant.service.jwt;

import com.spring.restaurant.service.dto.jwt.ClientLoginDto;
import com.spring.restaurant.service.dto.jwt.TokenDto;
import jakarta.transaction.SystemException;

public interface AuthService {
    TokenDto login(ClientLoginDto clientLoginDto) throws SystemException;
}
