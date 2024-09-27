package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SwarmPlotData {
    String name;
    Object id;
    String group;
    Integer height;
    Integer weight;

    public SwarmPlotData(String name,Object id, String group, Integer height, Integer weight) {
        this.name = name;
        this.id = id;
        this.group = group;
        this.height = height;
        this.weight = weight;
    }
}
