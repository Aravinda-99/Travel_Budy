package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.HotelDTO;
import com.example.backend.entity.Hotel;
import com.example.backend.repo.HotelRepo;
import com.example.backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelServiceIMPL implements HotelService {

    @Autowired
    private HotelRepo hotelRepo;


    @Override
    public String saveHotel(HotelDTO hotelDTO) {
        Hotel hotel = new Hotel();

        hotel.setName(hotelDTO.getName());
        hotel.setCity(hotelDTO.getCity());
        hotel.setCountry(hotelDTO.getCountry());
        hotel.setPriceRange(hotelDTO.getPriceRange());
        hotel.setAmenities(hotelDTO.getAmenities());
        hotel.setUserRating(hotelDTO.getUserRating());
        hotel.setAffiliateBookingLink(hotelDTO.getAffiliateBookingLink());

        hotelRepo.save(hotel);

        return "Hotel saved successfully!";
    }

    @Override
    public String updateHotel(HotelDTO hotelDTO) {
        if (hotelDTO.getId() == null) {
            return "Hotel ID cannot be null for update operation";
        }

        if (!hotelRepo.existsById(hotelDTO.getId())) {
            return "Hotel not found with ID: " + hotelDTO.getId();
        }

        Hotel hotel = hotelRepo.findById(hotelDTO.getId()).get();

        hotel.setName(hotelDTO.getName());
        hotel.setCity(hotelDTO.getCity());
        hotel.setCountry(hotelDTO.getCountry());
        hotel.setPriceRange(hotelDTO.getPriceRange());
        hotel.setAmenities(hotelDTO.getAmenities());
        hotel.setUserRating(hotelDTO.getUserRating());
        hotel.setAffiliateBookingLink(hotelDTO.getAffiliateBookingLink());

        hotelRepo.save(hotel);

        return "Hotel updated successfully!";
    }

    @Override
    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotels = hotelRepo.findAll();
        List<HotelDTO> hotelDTOs = new ArrayList<>();

        for (Hotel hotel : hotels) {
            HotelDTO hotelDTO = new HotelDTO();

            hotelDTO.setId(hotel.getId());
            hotelDTO.setName(hotel.getName());
            hotelDTO.setCity(hotel.getCity());
            hotelDTO.setCountry(hotel.getCountry());
            hotelDTO.setPriceRange(hotel.getPriceRange());
            hotelDTO.setAmenities(hotel.getAmenities());
            hotelDTO.setUserRating(hotel.getUserRating());
            hotelDTO.setAffiliateBookingLink(hotel.getAffiliateBookingLink());

            hotelDTOs.add(hotelDTO);
        }

        return hotelDTOs;
    }

    @Override
    public String deleteHotel(Integer hotelId) {
        if (!hotelRepo.existsById(hotelId)) {
            return "Hotel not found with ID: " + hotelId;
        }

        hotelRepo.deleteById(hotelId);
        return "Hotel deleted successfully!";
    }
}
