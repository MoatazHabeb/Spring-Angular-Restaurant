package com.spring.restaurant.repository.jwt;

import com.spring.restaurant.model.clientmodels.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Client findByEmail(String email);
    //Optional<Client> findByEmail(String email);

}
