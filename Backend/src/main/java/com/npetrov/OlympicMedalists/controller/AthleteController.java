package com.npetrov.OlympicMedalists.controller;

import com.npetrov.OlympicMedalists.model.Athlete;
import com.npetrov.OlympicMedalists.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class AthleteController {
    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("/top-athletes/sports")
    @ResponseBody
    public List<String> findDistinctSports() {
         return athleteRepository.findDistinctSports();
    }

    @GetMapping("/top-athletes-old")
    @ResponseBody
    public Page<Athlete> findTopAthletesOld(
            @RequestParam(name="page", required=false,  defaultValue = "0") int currentPage,
            @RequestParam(name="sport", required=false,  defaultValue = "All") String sport
    ) {
        PageRequest pr = PageRequest.of(currentPage, 25,
                Sort.by("medals").descending().and(Sort.by("goldMedals").descending()).and(Sort.by("silverMedals").descending()));
        if (sport.equals("All")) {
            return athleteRepository.findAllByMedalsGreaterThan(0, pr);
        } else {
            return athleteRepository.findBySportAndMedalsGreaterThan(sport, 0, pr);
        }
    }

    @GetMapping("/top-athletes")
    @ResponseBody
    public List<Athlete> findTopAthletes(
            @RequestParam(name="sport", required=false,  defaultValue = "All") String sport
    ) {
        if (sport.equals("All")) {
            return athleteRepository.findAllByMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(0);
        } else {
            return athleteRepository.findBySportContainingAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(sport, 0);
        }
    }
}
