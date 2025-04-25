package com.spring.restaurant.controller;

import com.spring.restaurant.controller.vm.ProductActionsVM;
import com.spring.restaurant.controller.vm.ProductResponseVM;
import com.spring.restaurant.service.ProductService;
import com.spring.restaurant.service.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
@RestController

@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("pageNo/{pageNo}/pageSize/{pageSize}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    ResponseEntity <ProductResponseVM> productAllProducts(@PathVariable Integer pageNo, @PathVariable Integer pageSize){

        return ResponseEntity.ok(productService.getProducts(pageNo,pageSize));
    }

    @GetMapping("/category/categoryId/{categoryId}/pageNo/{pageNo}/pageSize/{pageSize}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    ResponseEntity<ProductResponseVM> productAllProducts(@PathVariable("categoryId") Long categoryId,@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
        return ResponseEntity.ok(productService.getProductsByCategoryId(categoryId,pageNo,pageSize));
    }

    @GetMapping("/search/{letters}/pageNo/{pageNo}/pageSize/{pageSize}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    ResponseEntity<ProductResponseVM> search(@PathVariable("letters") String letter,@PathVariable Integer pageNo, @PathVariable Integer pageSize){
        return ResponseEntity.ok(productService.getProductByLetters(letter,pageNo,pageSize));
    }

    @PostMapping("/addProduct")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> addProduct(@RequestBody ProductActionsVM productActionsVM) {
        productService.addProduct(productActionsVM);
        return ResponseEntity.created(URI.create("/product/addProduct")).build();
    }
    @DeleteMapping("/deleteProduct/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> deleteProductById(@PathVariable("productId") Long productId) {
        productService.deleteProductById(productId);
        return  ResponseEntity.created(URI.create("/product/deleteProduct")).build();
    }

    @PostMapping("/UpdateProduct")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<ProductDto> updateProductById(@RequestBody ProductDto productDto){
       return ResponseEntity.ok(productService.updateProductById(productDto));
    }

}
