package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MedalCount {
    private String noc;

    private String country;

    private Integer population;

    private Long goldMedals;

    private Long silverMedals;

    private Long bronzeMedals;

    private Long totalMedals;

    public MedalCount(String noc, String country, Integer population, Long goldMedals, Long silverMedals, Long bronzeMedals, Long totalMedals) {
        this.noc = noc;
        this.country = country;
        this.population = population;
        this.goldMedals = goldMedals;
        this.silverMedals = silverMedals;
        this.bronzeMedals = bronzeMedals;
        this.totalMedals = totalMedals;
    }

}
