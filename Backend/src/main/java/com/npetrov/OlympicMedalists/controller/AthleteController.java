package com.npetrov.OlympicMedalists.controller;

import com.npetrov.OlympicMedalists.model.Athlete;
import com.npetrov.OlympicMedalists.repository.AthleteRepository;
import com.npetrov.OlympicMedalists.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
}
