package com.spring.restaurant.service;

import com.spring.restaurant.model.ContactInfo;
import com.spring.restaurant.service.dto.ContactInfoDto;

public interface ContactInfoService {
    ContactInfoDto saveMessage(ContactInfoDto contactInfoDto);
}
