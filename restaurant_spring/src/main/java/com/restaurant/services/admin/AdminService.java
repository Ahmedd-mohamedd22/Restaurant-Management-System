package com.restaurant.services.admin;

import com.restaurant.dtos.CategoryDto;
import com.restaurant.dtos.ProductDto;
import com.restaurant.dtos.ReservationDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    CategoryDto postCategory(CategoryDto categoryDto) throws IOException;

    List<CategoryDto> getAllCategories();

    List<CategoryDto> getAllCategoriesByTitle(String title);

    ProductDto postProduct(Long categoryId, ProductDto productDtoDto) throws IOException;

    List<ProductDto> getAllProductsByCategory(Long categoryId);

    List<ProductDto> getProductsByCategoryAndTitle(Long categoryId, String title);

    void deleteProduct(Long productId);

    ProductDto getProductById(Long productId);

    ProductDto updateProduct(Long productId, ProductDto productDto) throws IOException;

    List<ReservationDto> getReservation();

    ReservationDto changeReservationStatus(Long reservationId, String status);
}
