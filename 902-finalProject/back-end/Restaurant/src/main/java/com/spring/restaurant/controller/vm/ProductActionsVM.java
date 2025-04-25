package com.spring.restaurant.controller.vm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductActionsVM {
    private String name;
    private String logoPath;
    private String description;
    private double price;
    private String categoryName;
}
