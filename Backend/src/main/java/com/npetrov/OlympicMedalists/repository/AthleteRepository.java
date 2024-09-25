package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Athlete;
import com.npetrov.OlympicMedalists.model.HeightWeightData;
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

    @Query("""
            SELECT new com.npetrov.OlympicMedalists.model.HeightWeightData(
                a.height,
                a.weight,
                COUNT(*)
            )
            FROM Athlete AS a
            WHERE a.sport=?1 AND a.sex=?2 AND a.height IS NOT NULL AND a.weight IS NOT NULL
            GROUP BY a.height, a.weight
            ORDER BY a.height
            """)
    List<HeightWeightData> getHeightWeightData(String sport, String sex);
}
