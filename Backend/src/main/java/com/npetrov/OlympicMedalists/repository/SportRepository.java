package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Sport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SportRepository extends JpaRepository<Sport, Integer> {
    List<Sport> findAllByOrderBySport();
    List<Sport> findBySeasonOrderBySport(String season);
}
