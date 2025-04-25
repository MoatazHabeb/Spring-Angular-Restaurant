package com.spring.restaurant.service.Impl;

import com.spring.restaurant.controller.vm.ProductActionsVM;
import com.spring.restaurant.controller.vm.ProductResponseVM;
import com.spring.restaurant.mapper.CategoryMapper;
import com.spring.restaurant.mapper.ProductMapper;
import com.spring.restaurant.model.Category;
import com.spring.restaurant.model.Product;
import com.spring.restaurant.repository.ProductRepository;
import com.spring.restaurant.service.CategoryService;
import com.spring.restaurant.service.ProductService;
import com.spring.restaurant.service.dto.CategoryDto;
import com.spring.restaurant.service.dto.ProductDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Override
    public ProductResponseVM getProductsByCategoryId(Long categoryId, Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Product> productPage = productRepository.findAllByCategoryId(categoryId,pageable);
        return new ProductResponseVM(
                ProductMapper.PRODUCT_MAPPER.toDtoList(productPage.getContent()),
                productPage.getTotalElements());

    }
    @Override
    public ProductResponseVM getProducts(Integer pageNo,  Integer pageSize){
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Product> productPage = productRepository.findAll(pageable);

        return new ProductResponseVM(
                ProductMapper.PRODUCT_MAPPER.toDtoList(productPage.getContent()),
                productPage.getTotalElements()
        );
    }

    @Override
    public ProductResponseVM getProductByLetters(String letter,Integer pageNo,  Integer pageSize){
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Product> productPage = productRepository.getProductByLetters(letter, pageable);
        List<Product> products = productPage.getContent();

        //<Product> products = productRepository.getProductByLetters(letter);

        if (products.isEmpty()) {
            throw new RuntimeException("error.noSuchLetter");
        }
        return new ProductResponseVM(ProductMapper.PRODUCT_MAPPER.toDtoList(products),
                productPage.getTotalElements());

    }

    @Override
    public List<ProductDto> findProductsByIds(List<Long> porductIds) {
        List <Product> products = productRepository.findAllById(porductIds);
        return ProductMapper.PRODUCT_MAPPER.toDtoList(products);
    }

    @Override
    public void addProduct(ProductActionsVM productActionsVM) {
        // Check if the category exists in the repository
        if (!categoryService.existedCategory(productActionsVM.getCategoryName())) {
            throw new RuntimeException("error.invalid.category");  // Error if category doesn't exist
        }
        if (productRepository.existsByName(productActionsVM.getName())) {
            throw new RuntimeException("error.invalid.product");  // Error if category doesn't exist
        }

        // Create a new Product entity and map fields from the DTO
        Product product = new Product();
        product.setName(productActionsVM.getName());
        product.setLogoPath(productActionsVM.getLogoPath());
        product.setDescription(productActionsVM.getDescription());
        product.setPrice(productActionsVM.getPrice());

        // Get the category object by its name
        Category category = categoryService.findByName(productActionsVM.getCategoryName());
        product.setCategory(category);

        // Save the product to the repository
        productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public ProductDto updateProductById(ProductDto productDto) {
        Optional<Product> optionalProduct = productRepository.findById(productDto.getId());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // Assuming Product and ProductDto have similar fields:
            product.setName(productDto.getName());
            product.setLogoPath(productDto.getLogoPath());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());

            Product updatedProduct = productRepository.save(product);
            return ProductMapper.PRODUCT_MAPPER.toDto(updatedProduct);
        }else {
            throw new EntityNotFoundException("Product not found with ID: " + productDto.getId());
        }

    }

    @Override
    public Product findProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.get();
    }
}
