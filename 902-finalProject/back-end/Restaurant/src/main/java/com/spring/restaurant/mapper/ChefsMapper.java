package com.spring.restaurant.mapper;

import com.spring.restaurant.model.Chefs;
import com.spring.restaurant.service.dto.ChefsDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ChefsMapper {
    ChefsMapper CHEFS_MAPPER = Mappers.getMapper(ChefsMapper.class);

    Chefs toEntity (ChefsDto chefDto);
    ChefsDto toDto (Chefs chef);
    List<ChefsDto>toDtoList(List<Chefs> chefs);
    List<Chefs> toEntityList (List<ChefsDto> chefDtoList);
}
