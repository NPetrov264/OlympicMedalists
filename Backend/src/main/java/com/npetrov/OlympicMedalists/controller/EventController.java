package com.npetrov.OlympicMedalists.controller;

import com.npetrov.OlympicMedalists.model.Event;
import com.npetrov.OlympicMedalists.model.Games;
import com.npetrov.OlympicMedalists.model.MedalCount;
import com.npetrov.OlympicMedalists.model.Sport;
import com.npetrov.OlympicMedalists.repository.EventRepository;
import com.npetrov.OlympicMedalists.repository.GamesRepository;
import com.npetrov.OlympicMedalists.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
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

    @GetMapping("/events")
    List<Event> getFirst100(){
        return eventRepository.findFirst100ByOrderById();
    }

    @GetMapping("/games")
    List<Games> getGames() {
        return gamesRepository.findAll(Sort.by( Sort.Direction.DESC,"id"));
    }

    @GetMapping("/medals")
    List<MedalCount> getAllEvents(
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

}
