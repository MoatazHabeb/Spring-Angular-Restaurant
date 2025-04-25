package com.spring.restaurant.service.Impl;

import com.spring.restaurant.controller.vm.CategoryVM;
import com.spring.restaurant.mapper.CategoryMapper;
import com.spring.restaurant.model.Category;
import com.spring.restaurant.model.Product;
import com.spring.restaurant.repository.CategoryRepository;
import com.spring.restaurant.service.CategoryService;
import com.spring.restaurant.service.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public List<CategoryDto> getAllCategory() {
        return CategoryMapper.CATEGORY_MAPPER.toDtoList(categoryRepository.findAll().stream()
                .collect(Collectors.toList()));
    }
    @Override
    public CategoryDto findById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);

        if (category.isEmpty()) {
            throw new RuntimeException("error.invalid.category");
        }
        return CategoryMapper.CATEGORY_MAPPER.toDto(category.get());
    }

    @Override
    public Category findByName(String name) {

        return categoryRepository.findCategoriesByName(name);
    }

    @Override
    public void addCategory(CategoryVM categoryVM) {


        if(categoryRepository.existsByName(categoryVM.getName())){
            throw new RuntimeException("error.invalid.categoryName");
        }

        Category category = new Category();
        category.setName(categoryVM.getName());
        category.setLogoPath(categoryVM.getLogoPath());
        category.setFlag(categoryVM.getFlag());
        categoryRepository.save(category);

    }

    @Override
    @Transactional
    public void deleteCategoryByName(String name) {
        if(!categoryRepository.existsByName(name)){
            throw new RuntimeException("error.invalid.category");
        }
        Optional<Category> optionalCategory = categoryRepository.findCategoryByName(name);
        Category category = optionalCategory.get();
        categoryRepository.delete(category);
    }

    @Override
    public void updateCategoryByName(String existedName, CategoryVM categoryVM) {
        Optional<Category> optionalCategory = categoryRepository.findCategoryByName(existedName);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setName(categoryVM.getName());
            category.setLogoPath(categoryVM.getLogoPath());
            category.setFlag(categoryVM.getFlag());
            categoryRepository.save(category);
        }else {
            throw new  RuntimeException("error.invalid.category");
        }
    }

    @Override
    public boolean existedCategory(String name) {

        return categoryRepository.existsByName(name);
    }


}
