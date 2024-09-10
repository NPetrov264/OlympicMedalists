package com.npetrov.OlympicMedalists.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "athletes")
public class Athlete {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name ="noc")
    private String noc;

    @Column(name ="team")
    private String team;

    @Column(name ="athleteName")
    private String athleteName;

    @Column(name ="sex")
    private String sex;

    @Column(name ="height")
    private Integer height;

    @Column(name ="weight")
    private Integer weight;

    @Column(name ="sport")
    private String sport;

    @Column(name ="timesParticipated")
    private Integer timesParticipated;

    @Column(name ="medals")
    private Integer medals;

    @Column(name ="goldMedals")
    private Integer goldMedals;

    @Column(name ="silverMedals")
    private Integer silverMedals;

    @Column(name ="bronzeMedals")
    private Integer bronzeMedals;

//    @OneToMany(cascade = CascadeType.PERSIST)
//    @JoinColumn(name = "athleteId", referencedColumnName = "id")
//    private List<Event> event;

}