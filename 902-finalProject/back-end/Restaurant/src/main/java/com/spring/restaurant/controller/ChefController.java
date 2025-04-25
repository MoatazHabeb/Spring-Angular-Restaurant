package com.spring.restaurant.controller;

import com.spring.restaurant.service.ChefService;
import com.spring.restaurant.service.dto.ChefsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Chef")
public class ChefController {
    @Autowired
    private ChefService chefService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    ResponseEntity<List<ChefsDto>> getAllChefs(){

        return ResponseEntity.ok(chefService.getAllChefs());
    }
}
