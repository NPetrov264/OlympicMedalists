package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select test from Event test where test.medal != 'NA'")
    List<Event> findAllWithMedals();

    @Query(value = "SELECT DISTINCT noc, country, count(IF(medal = 'Gold', 1, NULL)) AS goldMedals, count(IF(medal = 'Silver', 1, NULL)) AS silverMedals, count(IF(medal = 'bronze', 1, NULL)) AS bronzeMedals, count(IF(medal != 'NA', 1, NULL)) AS totalMedals FROM events WHERE eventYear >= 2000 AND eventYear <=2000 GROUP BY noc ORDER BY totalMedals DESC, goldMedals DESC, silverMedals DESC", nativeQuery = true)
    List<Event> adsd();

}
