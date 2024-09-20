package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Participants {
    Long male;
    Long female;

    public Participants(Long male, Long female) {
        this.male = male;
        this.female = female;
    }
}
