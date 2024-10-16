package com.npetrov.OlympicMedalists.controller;

import com.npetrov.OlympicMedalists.model.*;
import com.npetrov.OlympicMedalists.repository.EventRepository;
import com.npetrov.OlympicMedalists.repository.GamesRepository;
import com.npetrov.OlympicMedalists.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class EventController {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private SportRepository sportRepository;
    @Autowired
    private GamesRepository gamesRepository;

    @GetMapping("/sports")
    public List<Sport> getSports(){
        return sportRepository.findAllByOrderBySport();
    }

    @GetMapping("/games")
    List<Games> getGames() {
        return gamesRepository.findAll(Sort.by( Sort.Direction.DESC,"id"));
    }

    @GetMapping("/medals")
    List<MedalCount> getMedalsByCountry(
        @RequestParam(name="startYear", required=false,  defaultValue = "1896") int startYear,
        @RequestParam(name="endYear", required=false,  defaultValue = "2024") int endYear,
        @RequestParam(name="season", required=false,  defaultValue = "Both") String season
    ){
        if(season.equals("Both")) {
            return eventRepository.countTotalMedals(startYear, endYear);
        } else {
            return eventRepository.countTotalMedalsSeason(startYear, endYear, season);
        }
    }

    @GetMapping("/total-medals-geo")
    List<MedalsGeoData> getMedalsGeo(
            @RequestParam(name="startYear", required=false,  defaultValue = "1896") int startYear,
            @RequestParam(name="endYear", required=false,  defaultValue = "2024") int endYear,
            @RequestParam(name="season", required=false,  defaultValue = "Both") String season
    ){
        if(season.equals("Both")) {
            return eventRepository.countTotalMedalsGeoData(startYear, endYear);
        } else {
            return eventRepository.countTotalMedalsSeasonGeoData(startYear, endYear, season);
        }
    }

    @GetMapping("/participants")
    List<Participants> getParticipants(
            @RequestParam(name="season", required=true,  defaultValue = "Summer") String season

    ){
        return eventRepository.countParticipants(season);
    }

}
