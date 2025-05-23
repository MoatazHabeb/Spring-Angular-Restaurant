package com.spring.restaurant.service.jwt;

import com.spring.restaurant.model.clientmodels.Client;

import com.spring.restaurant.service.dto.jwt.ClientDto;
import jakarta.transaction.SystemException;

public interface ClientService {

    Client getClientbyEmail(String email) throws SystemException;
    Client checkClientExistByToken(String token) throws SystemException;
    void createUserClient (ClientDto clientDto) throws SystemException;
    ClientDto getClientById( Long id);
}
