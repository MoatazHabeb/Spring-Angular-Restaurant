package com.spring.restaurant.controller.Jwt;


import com.spring.restaurant.service.dto.jwt.ClientDto;
import com.spring.restaurant.service.dto.jwt.ClientLoginDto;
import com.spring.restaurant.service.dto.jwt.TokenDto;
import com.spring.restaurant.service.jwt.AuthService;
import com.spring.restaurant.service.jwt.ClientService;
import jakarta.transaction.SystemException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/client")
@Validated
public class ClientController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ClientService clientService;

    @PostMapping("/login")
    ResponseEntity<TokenDto>login(@RequestBody ClientLoginDto clientLoginDto) throws SystemException {

        return ResponseEntity.ok(authService.login(clientLoginDto));
    }

    @PostMapping("/create-client")
    ResponseEntity<Void> createUser(@RequestBody @Valid ClientDto clientDto) throws SystemException {
        clientService.createUserClient(clientDto);
        return  ResponseEntity.created(URI.create("/client/addClientWithRole")).build();
    }
}
