package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MedalsGeoData {
    private String id;
    private Long value;

    public MedalsGeoData(String id, Long value) {
        this.id = id;
        this.value = value;
    }
}
