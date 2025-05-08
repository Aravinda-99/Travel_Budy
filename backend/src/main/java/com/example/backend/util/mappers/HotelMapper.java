package com.example.backend.util.mappers;


import com.example.backend.dto.HotelDTO;
import com.example.backend.entity.Hotel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HotelMapper {

    HotelDTO toDto(Hotel hotel);
    Hotel toEntity(HotelDTO dto);
}
