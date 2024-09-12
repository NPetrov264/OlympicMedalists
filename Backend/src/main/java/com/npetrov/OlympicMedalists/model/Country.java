package com.npetrov.OlympicMedalists.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "countries")
public class Country {
    @Id
    @Column(name = "noc")
    private String noc;

    @Column(name ="country")
    private String country;

    @Column(name ="population")
    private Integer population;

}
