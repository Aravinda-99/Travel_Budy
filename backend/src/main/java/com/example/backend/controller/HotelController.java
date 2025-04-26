package com.example.backend.controller;


import com.example.backend.dto.HotelDTO;
import com.example.backend.service.HotelService;
import com.example.backend.util.StandradResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/hotel")
@CrossOrigin //Security Perpose walata use krnne
public class HotelController {

    @Autowired
    private HotelService hotelService;

//    @PostMapping(path = "/save")
//    public String saveHotel(@RequestBody HotelDTO hotelDTO) {
//        String message = hotelService.saveHotel(hotelDTO);
//        return message;
//    }

    @PostMapping("/save")
    public ResponseEntity<StandradResponse> saveHotel(@RequestBody HotelDTO hotelDTO) {
        // @RequestBody converts the JSON from frontend to HotelDTO format

        String message = hotelService.saveHotel(hotelDTO);
        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(201, "Success", message), (HttpStatus.CREATED)
        );

        return response;
    }

//    @PutMapping(path = "/update")
//    public String updateHotel(@RequestBody HotelDTO hotelDTO) {
//        String message = hotelService.updateHotel(hotelDTO);
//        return message;
//    }


    @PutMapping("/update")
    public ResponseEntity<StandradResponse> updateHotel(@RequestBody HotelDTO hotelDTO) {
        String message = hotelService.updateHotel(hotelDTO);

        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", message), (HttpStatus.OK)
        );
        return response;
    }

//    @GetMapping(path = "/get-all-hotel")
//    public List<HotelDTO> getAllHotels() {
//        List<HotelDTO> allHotels = hotelService.getAllHotels();
//        return allHotels;
//    }

    @GetMapping("/get-all-hotel")
    public ResponseEntity<StandradResponse> getAllHotels() {
        List<HotelDTO> allHotels = hotelService.getAllHotels();

        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", allHotels), (HttpStatus.OK)
        );

        return response;
    }

//    @DeleteMapping(path = "/delete-hotel/{id}")
//    public String deleteHotel(@PathVariable(value = "id") Integer hotelId) {
//        String message = hotelService.deleteHotel(hotelId);
//        return message;
//    }
    @DeleteMapping("/delete-hotel/{id}")
    public ResponseEntity<StandradResponse> deleteHotel(@PathVariable(value = "id") Integer hotelId) {
        String message = hotelService.deleteHotel(hotelId);

        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", message), (HttpStatus.OK)
        );

        return response;
    }


}
