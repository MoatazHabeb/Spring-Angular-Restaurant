package com.spring.restaurant.service;

import com.spring.restaurant.controller.vm.CategoryVM;
import com.spring.restaurant.model.Category;
import com.spring.restaurant.service.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategory();
    CategoryDto findById(Long id);

    Category findByName(String name);

    void addCategory(CategoryVM categoryVM);

    void deleteCategoryByName(String name);

    void updateCategoryByName(String existedName, CategoryVM categoryVM);

    boolean existedCategory(String name);
}
