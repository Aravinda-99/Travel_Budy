package com.example.backend.service;

import com.example.backend.dto.HotelDTO;

import java.util.List;

public interface HotelService {
    String saveHotel(HotelDTO hotelDTO);

    String updateHotel(HotelDTO hotelDTO);

    List<HotelDTO> getAllHotels();

    String deleteHotel(Integer hotelId);
}
