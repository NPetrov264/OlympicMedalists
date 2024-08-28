package com.npetrov.OlympicMedalists.controller;

import com.npetrov.OlympicMedalists.model.Event;
import com.npetrov.OlympicMedalists.repository.AthleteRepository;
import com.npetrov.OlympicMedalists.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class EventController {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private AthleteRepository athleteRepository;

    @PostMapping("/event")
    Event newEvent(@RequestBody Event newEvent) {
        return eventRepository.save(newEvent);
    }

    @GetMapping("/events")
    List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

}
