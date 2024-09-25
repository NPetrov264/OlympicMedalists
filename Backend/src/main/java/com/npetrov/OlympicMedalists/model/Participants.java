package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Participants {
    private Integer year;
    private Long male;
    private Long female;

    public Participants(Integer year, Long male, Long female) {
        this.year = year;
        this.male = male;
        this.female = female;
    }
}
