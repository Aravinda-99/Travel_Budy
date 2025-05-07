package com.example.backend.dto;

import com.example.backend.entity.PriceRange;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelDTO {

    private Integer id;
    private String name;
    private String city;
    private String country;
    private PriceRange priceRange;

    @Builder.Default
    private Set<String> amenities = new HashSet<>();

    private Double userRating;
    private String affiliateBookingLink;

    private String image;

    // Convenience methods
    public void addAmenity(String amenity) {
        this.amenities.add(amenity);
    }

    public void removeAmenity(String amenity) {
        this.amenities.remove(amenity);
    }
}
