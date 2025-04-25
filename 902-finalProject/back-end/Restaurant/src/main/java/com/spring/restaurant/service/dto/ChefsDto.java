package com.spring.restaurant.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChefsDto {
    private Long id;
    private String fullName;
    private String logoPath;
    private String facebookLink;
    private String instagramLink;
    private String twitterLink;
    private String specialty;
}
