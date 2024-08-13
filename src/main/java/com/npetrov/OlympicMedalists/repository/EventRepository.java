package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select test from Event test where test.medal != 'NA'")
    List<Event> findAllWithMedals();

}
