package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AthleteRepository extends JpaRepository<Athlete, Integer> {

    @Query("SELECT DISTINCT athletes.sport FROM Athlete athletes ORDER BY athletes.sport")
    List<String> findDistinctSports();
    List<Athlete> findAllByMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(int medals);
    List<Athlete> findBySportEqualsAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(String sport, int medals);
    List<Athlete> findByTeamContainsAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(String team, int medals);
    List<Athlete> findByTeamContainingAndSportAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(String team, String sport, int medals);

}
