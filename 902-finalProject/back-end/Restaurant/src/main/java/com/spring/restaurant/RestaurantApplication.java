package com.spring.restaurant;


import com.spring.restaurant.service.dto.ProductDto;
import com.spring.restaurant.sittings.TokenConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.repository.config.FragmentMetadata;

import java.util.function.Predicate;

@SpringBootApplication
@EnableConfigurationProperties(TokenConfig.class)
@ConfigurationPropertiesScan
public class RestaurantApplication {

    public static void main(String[] args) {

        SpringApplication.run(RestaurantApplication.class, args);

    }

}
