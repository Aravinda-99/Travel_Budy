package com.example.backend.controller;


import com.example.backend.dto.HotelDTO;
import com.example.backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/hotel")
@CrossOrigin //Security Perpose walata use krnne
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping(path = "/save")
    public String saveHotel(@RequestBody HotelDTO hotelDTO) {
        String message = hotelService.saveHotel(hotelDTO);
        return message;
    }

    @PutMapping(path = "/update")
    public String updateHotel(@RequestBody HotelDTO hotelDTO) {
        String message = hotelService.updateHotel(hotelDTO);
        return message;
    }

    @GetMapping(path = "/get-all-hotel")
    public List<HotelDTO> getAllHotels() {
        List<HotelDTO> allHotels = hotelService.getAllHotels();
        return allHotels;
    }

    @DeleteMapping(path = "/delete-hotel/{id}")
    public String deleteHotel(@PathVariable(value = "id") Integer hotelId) {
        String message = hotelService.deleteHotel(hotelId);
        return message;
    }


}
