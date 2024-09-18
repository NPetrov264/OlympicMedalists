package com.npetrov.OlympicMedalists.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "games")
public class Games {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "eventYear")
    private Integer eventYear;

    @Column(name = "season")
    private String season;

    @Column(name = "city")
    private String city;
}
