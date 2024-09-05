package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AthleteRepository extends JpaRepository<Athlete, Integer> {

    @Query("SELECT DISTINCT athletes.sport FROM Athlete athletes ORDER BY athletes.sport")
    List<String> findDistinctSports();
    @Query("SELECT DISTINCT athletes.country FROM Athlete athletes ORDER BY athletes.country")
    List<String> findDistinctCountries();
    Page<Athlete> findAllByMedalsGreaterThan(int medals, Pageable pageable);
    List<Athlete> findAllByMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(int medals);
    Page<Athlete> findByCountryContainingAndMedalsGreaterThan(String country, int medals, Pageable pageable);
    List<Athlete> findByCountryContainingAndMedalsGreaterThan(String country, int medals);
    Page<Athlete> findBySportAndMedalsGreaterThan(String sport, int medals, Pageable pageable);
    List<Athlete> findBySportAndMedalsGreaterThanOrderByMedalsDescGoldMedalsDescSilverMedalsDesc(String sport, int medals);

}
