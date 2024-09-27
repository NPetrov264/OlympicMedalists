package com.npetrov.OlympicMedalists.controller;

import com.npetrov.OlympicMedalists.model.*;
import com.npetrov.OlympicMedalists.repository.AthleteRepository;
import com.npetrov.OlympicMedalists.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class AthleteController {
    @Autowired
    private AthleteRepository athleteRepository;
    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/sportList")
    @ResponseBody
    public List<String> findDistinctSports() {
         return athleteRepository.findDistinctSports();
    }

    @GetMapping("/countriesList")
    @ResponseBody
    public List<String> findDistinctCountries() {
        return countryRepository.findDistinctCountries();
    }

    @GetMapping("/top-athletes")
    @ResponseBody
    public List<Athlete> findTopAthletes(
            @RequestParam(name="sport", required=false,  defaultValue = "All") String sport,
            @RequestParam(name="country", required=false,  defaultValue = "All") String country
    ) {
        if (sport.equals("All") && country.equals("All")) {
            return athleteRepository.findAllByMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(0);
        } else if (country.equals("All")){
            return athleteRepository.findBySportEqualsAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(sport, 0);
        } else if (sport.equals("All")) {
            return athleteRepository.findByTeamContainsAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(country, 0);
        } else {
            return athleteRepository.findByTeamContainingAndSportAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(country, sport,0);
        }
    }

    @GetMapping("/height-weight-heatmap")
    @ResponseBody
    List<HeatMapData> getHeightWeightDistribution(
            @RequestParam(name="sport", required=false, defaultValue = "Gymnastics") String sport,
            @RequestParam(name="sex", required=false, defaultValue = "M") String sex
    ){
        List<HeightWeightData> data = athleteRepository.getHeightWeightData(sport, sex);
        List<HeatMapData> heatMap = new ArrayList<>();


        int minWeight = 1000;
        int maxWeight = 0;
        int minHeight = data.getFirst().getHeight();
        int maxHeight = data.getLast().getHeight();

        for(HeightWeightData elem: data) {
            int weight = elem.getWeight();
            if(weight > maxWeight) {
                maxWeight = weight;
            } else if(weight < minWeight) {
                minWeight = weight;
            }
        }
        Long[][] array = new Long[maxHeight + 1][maxWeight + 1];

        for(HeightWeightData elem: data) {
            int height = elem.getHeight();
            int weight = elem.getWeight();
            array[height][weight] = elem.getCount();
        }

        for(int i = maxHeight; i >= minHeight; i--) {
            List<XYData> list = new ArrayList<>();
            for (int j = minWeight; j <= maxWeight; j++) {
                list.add(new XYData(j, array[i][j]));
            }
            heatMap.add(new HeatMapData(i, list));
        }

        return heatMap;
    }

    @GetMapping("/height-distribution")
    @ResponseBody
    List<SwarmPlotData> getHeightDistribution(
            @RequestParam(name="sport1", required=false, defaultValue = "Gymnastics") String sport1,
            @RequestParam(name="sport2", required=false, defaultValue = "Gymnastics") String sport2,
            @RequestParam(name="sex1", required=false, defaultValue = "M") String sex1,
            @RequestParam(name="sex2", required=false, defaultValue = "F") String sex2
    ) {
        return athleteRepository.get2SportHeigthWeightData(sport1, sport2, sex1, sex2);
    }
}
