package com.npetrov.OlympicMedalists.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "sports")
public class Sport {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name ="sport")
    private String sport;

    @Column(name ="season")
    private String season;

    @Column(name ="firstAppearance")
    private Integer firstAppearance;

    @Column(name ="lastAppearance")
    private Integer lastAppearance;
}