package com.spring.restaurant.controller;

import com.spring.restaurant.config.Jwt.TokenHandler;
import com.spring.restaurant.service.ContactInfoService;
import com.spring.restaurant.service.dto.ContactInfoDto;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/ContactInfo")
public class ContactInfoController {


    @Autowired
    private ContactInfoService contactInfoService;


    @PostMapping("/saveMessage")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ContactInfoDto> saveMessage(@RequestBody ContactInfoDto contactInfoDto) {


        ContactInfoDto savedContactInfo = contactInfoService.saveMessage(contactInfoDto);
        return ResponseEntity.ok(savedContactInfo);
    }
}