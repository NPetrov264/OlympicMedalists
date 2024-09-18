package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Games;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamesRepository  extends JpaRepository<Games, Integer> {

}
