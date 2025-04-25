package com.spring.restaurant.model;

import jakarta.persistence.*;

import lombok.Getter;

import lombok.Setter;


@Entity
@Getter
@Setter

public class Chefs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String logoPath;
    private String facebookLink;
    private String instagramLink;
    private String twitterLink;
    private String specialty;
}
