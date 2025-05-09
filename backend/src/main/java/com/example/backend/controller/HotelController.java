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



    @PostMapping("/save")
    public ResponseEntity<StandradResponse> saveHotel(@RequestBody HotelDTO hotelDTO) {
        // @RequestBody converts the JSON from frontend to HotelDTO format

        String message = hotelService.saveHotel(hotelDTO);
        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(201, "Success", message), (HttpStatus.CREATED)
        );

        return response;
    }



    @PutMapping("/update")
    public ResponseEntity<StandradResponse> updateHotel(@RequestBody HotelDTO hotelDTO) {
        String message = hotelService.updateHotel(hotelDTO);

        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", message), (HttpStatus.OK)
        );
        return response;
    }



    @GetMapping("/get-all-hotel")
    public ResponseEntity<StandradResponse> getAllHotels() {
        List<HotelDTO> allHotels = hotelService.getAllHotels();

        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", allHotels), (HttpStatus.OK)
        );

        return response;
    }

    @GetMapping("/get-hotel/{hotelId}")
    public ResponseEntity<StandradResponse> getHotelById(@PathVariable Integer hotelId) {
        HotelDTO hotel = hotelService.getHotelById(hotelId);
        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", hotel), HttpStatus.OK
        );
        return response;
    }


    @DeleteMapping("/delete-hotel/{id}")
    public ResponseEntity<StandradResponse> deleteHotel(@PathVariable(value = "id") Integer hotelId) {
        String message = hotelService.deleteHotel(hotelId);

        ResponseEntity<StandradResponse> response = new ResponseEntity<StandradResponse>(
                new StandradResponse(200, "Success", message), (HttpStatus.OK)
        );

        return response;
    }


}
