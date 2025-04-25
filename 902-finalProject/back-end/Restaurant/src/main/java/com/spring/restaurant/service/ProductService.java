package com.spring.restaurant.service;

import com.spring.restaurant.controller.vm.ProductActionsVM;
import com.spring.restaurant.controller.vm.ProductResponseVM;
import com.spring.restaurant.model.Product;
import com.spring.restaurant.service.dto.ProductDto;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ProductService {
    ProductResponseVM getProductsByCategoryId(Long categoryId,Integer pageNo,  Integer pageSize);
    ProductResponseVM getProducts(Integer pageNo,  Integer pageSize);
    ProductResponseVM getProductByLetters(String letter, Integer pageNo, Integer pageSize);
    List<ProductDto> findProductsByIds(List<Long> porductIds);
    void addProduct(ProductActionsVM productActionsVM);


    void deleteProductById(Long productId);

    ProductDto updateProductById(ProductDto productDto);

    Product findProductById(Long productId);
}
