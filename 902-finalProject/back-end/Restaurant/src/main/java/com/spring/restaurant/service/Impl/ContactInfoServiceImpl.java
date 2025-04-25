package com.spring.restaurant.service.Impl;


import com.spring.restaurant.mapper.ContactInfoMapper;
import com.spring.restaurant.model.ContactInfo;
import com.spring.restaurant.model.clientmodels.Client;
import com.spring.restaurant.repository.ContactInfoRepository;

import com.spring.restaurant.repository.jwt.ClientRepository;
import com.spring.restaurant.service.ContactInfoService;
import com.spring.restaurant.service.dto.ContactInfoDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ContactInfoServiceImpl implements ContactInfoService {

    @Autowired
    private  ContactInfoRepository contactInfoRepository;




    @Override
    public ContactInfoDto saveMessage(ContactInfoDto contactInfoDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Client client = (Client) authentication.getPrincipal();



            // Map to entity
            ContactInfo contactInfo = ContactInfoMapper.CONTACT_INFO_MAPPER.toEntity(contactInfoDto);
            contactInfo.setClient(client);


            // Save
            ContactInfo savedContactInfo = contactInfoRepository.save(contactInfo);


            return ContactInfoMapper.CONTACT_INFO_MAPPER.toDto(savedContactInfo);

        }
}