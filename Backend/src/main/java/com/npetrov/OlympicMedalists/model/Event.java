package com.npetrov.OlympicMedalists.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "test")
public class Event {
    @Id
    @Column(name ="id")
    private Long id;

    @Column(name ="athleteId")
    private Integer athleteId;

    @Column(name ="athleteName")
    private String athleteName;

    @Column(name ="sex")
    private String sex;

    @Column(name ="age")
    private Integer age;

    @Column(name ="height")
    private Integer height;

    @Column(name ="weight")
    private Integer weight;

    @Column(name ="country")
    private String country;

    @Column(name ="noc")
    private String noc;

    @Column(name ="games")
    private String games;

    @Column(name ="eventYear")
    private Integer eventYear;

    @Column(name ="season")
    private String season;

    @Column(name ="city")
    private String city;

    @Column(name ="sport")
    private String sport;

    @Column(name ="discipline")
    private String discipline;

    @Column(name ="medal")
    private String medal;

}
