package com.npetrov.OlympicMedalists.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class HeatMapData{

    public Integer id;

    public List<XYData> data;

    public HeatMapData(Integer id, List<XYData> data) {
        this.id = id;
        this.data = data;
    }
}