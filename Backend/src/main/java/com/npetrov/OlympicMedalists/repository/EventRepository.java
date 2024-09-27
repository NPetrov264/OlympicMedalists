package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findFirst100ByOrderById();

    @Query("""
            SELECT new com.npetrov.OlympicMedalists.model.MedalCount(
                e.noc.noc,
                e.noc.country,
                e.noc.population,
                count(IF(e.medal = 'Gold', 1, NULL)) AS goldMedals,
                count(IF(e.medal = 'Silver', 1, NULL)) AS silverMedals,
                count(IF(e.medal = 'Bronze', 1, NULL)) AS bronzeMedals,
                count(IF(e.medal != 'NA', 1, NULL)) AS totalMedals
            )
            FROM Event AS e
            WHERE e.eventYear>=?1 AND e.eventYear<=?2
            GROUP BY e.noc
            ORDER BY totalMedals ASC
            """)
    List<MedalCount> countTotalMedals(int startYear, int endYear);

    @Query("""
            SELECT new com.npetrov.OlympicMedalists.model.MedalCount(
                e.noc.noc,
                e.noc.country,
                e.noc.population,
                count(IF(e.medal = 'Gold', 1, NULL)) AS goldMedals,
                count(IF(e.medal = 'Silver', 1, NULL)) AS silverMedals,
                count(IF(e.medal = 'Bronze', 1, NULL)) AS bronzeMedals,
                count(IF(e.medal != 'NA', 1, NULL)) AS totalMedals
            )
            FROM Event AS e
            WHERE e.eventYear>=?1 AND e.eventYear<=?2 AND e.season=?3
            GROUP BY e.noc
            ORDER BY totalMedals ASC
            """)
    List<MedalCount> countTotalMedalsSeason(int startYear, int endYear, String season);

    @Query("""
            SELECT new com.npetrov.OlympicMedalists.model.MedalsGeoData(
                e.noc.noc as id,
                count(IF(e.medal != 'NA', 1, NULL)) AS data
            )
            FROM Event AS e
            WHERE e.eventYear>=?1 AND e.eventYear<=?2
            GROUP BY e.noc
            ORDER BY data DESC
            """)
    List<MedalsGeoData> countTotalMedalsGeoData(int startYear, int endYear);

    @Query("""
            SELECT new com.npetrov.OlympicMedalists.model.MedalsGeoData(
                e.noc.noc as id,
                count(IF(e.medal != 'NA', 1, NULL)) AS data
            )
            FROM Event AS e
            WHERE e.eventYear>=?1 AND e.eventYear<=?2 AND e.season=?3
            GROUP BY e.noc
            ORDER BY data DESC
            """)
    List<MedalsGeoData> countTotalMedalsSeasonGeoData(int startYear, int endYear, String season);

    @Query("""
            SELECT new com.npetrov.OlympicMedalists.model.Participants(
                e.eventYear as year,
                count(DISTINCT(case when e.sex = 'M' then e.athleteId end)) as male,
                count(DISTINCT(case when e.sex = 'F' then e.athleteId end)) as female
            )
            FROM Event AS e
            WHERE e.season=?1
            GROUP BY e.eventYear
            ORDER BY e.eventYear ASC
            """)
    List<Participants> countParticipants(String season);

}
