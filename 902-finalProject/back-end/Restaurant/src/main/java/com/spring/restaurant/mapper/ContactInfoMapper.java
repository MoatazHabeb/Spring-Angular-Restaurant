package com.spring.restaurant.mapper;

import com.spring.restaurant.model.ContactInfo;
import com.spring.restaurant.model.Orders;
import com.spring.restaurant.service.dto.ContactInfoDto;
import com.spring.restaurant.service.dto.OrdersDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ContactInfoMapper {
    ContactInfoMapper CONTACT_INFO_MAPPER = Mappers.getMapper(ContactInfoMapper.class);


    ContactInfo toEntity(ContactInfoDto contactInfoDto);

    List<ContactInfo> toEntity(List<ContactInfoDto> contactInfoDtos);


    ContactInfoDto toDto(ContactInfo contactInfo);

    List<ContactInfoDto> toDto(List<ContactInfo> contactInfos);
}
