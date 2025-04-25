package com.spring.restaurant.controller;

import com.spring.restaurant.controller.vm.CategoryVM;
import com.spring.restaurant.controller.vm.ProductActionsVM;
import com.spring.restaurant.service.CategoryService;
import com.spring.restaurant.service.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/category")

public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping
    ResponseEntity<List<CategoryDto>> categories(){

        return  ResponseEntity.ok(categoryService.getAllCategory());
    }

    @PostMapping("/addCategory")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> addCategory(@RequestBody CategoryVM categoryVM) {
        categoryService.addCategory(categoryVM);
        return ResponseEntity.created(URI.create("/category/addCategory")).build();
    }


    @DeleteMapping ("/deleteCategory/{name}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> deleteCategoryByName(@PathVariable String name) {
        name = name.replace("\"", ""); // remove quotes from JSON string if sent raw
        categoryService.deleteCategoryByName(name);
        return ResponseEntity.created(URI.create("/category/deleteCategory")).build();
    }

    @PostMapping("/updateCategory/{existedName}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> updateCategoryByName(@PathVariable String existedName,@RequestBody CategoryVM categoryVM) {
        categoryService.updateCategoryByName(existedName,categoryVM);
        return ResponseEntity.ok().build();
    }

}
