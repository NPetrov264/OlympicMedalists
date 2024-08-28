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

    @GetMapping("/top-athletes/{country}")
    @ResponseBody
    public Page<Athlete> topAthletes(@PathVariable  String  country, @RequestParam int currentPage){
        PageRequest pr = PageRequest.of(currentPage, 20,
                Sort.by("medals").descending().and(Sort.by("goldMedals").descending()).and(Sort.by("silverMedals").descending()));
        return athleteRepository.findByCountryContainingAndMedalsGreaterThan(country, 0, pr);
    }

    @GetMapping("/sports")
    @ResponseBody
    public List<String> findDistinctSports(){
         return athleteRepository.findDistinctSports();
    }

    @GetMapping("/top-athletes")
    @ResponseBody
    public Page<Athlete> findTopAthletes(
            @RequestParam(name="page", required=false,  defaultValue = "0") int currentPage,
            @RequestParam(name="sport", required=false,  defaultValue = "All") String sport
    ) {
        PageRequest pr = PageRequest.of(currentPage, 20,
                Sort.by("medals").descending().and(Sort.by("goldMedals").descending()).and(Sort.by("silverMedals").descending()));
        if (sport.equals("All")) {
            return athleteRepository.findAllByMedalsGreaterThan(0, pr);
        } else {
            return athleteRepository.findBySportAndMedalsGreaterThan(sport, 0, pr);
        }
    }
}
