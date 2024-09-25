package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HeightWeightData {
    Integer height;
    Integer weight;
    Long count;

    public HeightWeightData(Integer height, Integer weight, Long count) {
        this.height = height;
        this.weight = weight;
        this.count = count;
    }
}

