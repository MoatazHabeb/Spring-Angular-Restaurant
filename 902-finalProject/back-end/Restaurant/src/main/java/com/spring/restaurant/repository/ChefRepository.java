package com.spring.restaurant.repository;

import com.spring.restaurant.model.Chefs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChefRepository extends JpaRepository<Chefs, Long> {
}
