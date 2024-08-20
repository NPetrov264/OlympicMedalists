package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AthleteRepository extends JpaRepository<Athlete, Integer> {

    List<Athlete> findTop20ByOrderByMedalsDesc();

    Page<Athlete> findByCountryContaining(String country, Pageable pageable);

}
