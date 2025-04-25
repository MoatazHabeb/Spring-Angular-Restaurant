package com.spring.restaurant.repository;

import com.spring.restaurant.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoriesByName(String name);
    Optional<Category> findCategoryByName(String name);
    void deleteCategoryByName(String name);
    boolean existsByName(String name);
}
