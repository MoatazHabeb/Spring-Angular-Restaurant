package com.spring.restaurant.service.Impl;

import com.spring.restaurant.mapper.ChefsMapper;
import com.spring.restaurant.model.Chefs;
import com.spring.restaurant.repository.ChefRepository;
import com.spring.restaurant.service.ChefService;
import com.spring.restaurant.service.dto.ChefsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChefServiceImpl implements ChefService {
    @Autowired
    private ChefRepository chefsRepository;
    @Override
    public List<ChefsDto> getAllChefs() {
        List<Chefs> chefs = chefsRepository.findAll();
        List<ChefsDto> chefDtoList = ChefsMapper.CHEFS_MAPPER.toDtoList(chefs);
        return chefDtoList;

    }
}
