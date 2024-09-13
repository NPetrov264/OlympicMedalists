package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, String> {
    @Query("SELECT DISTINCT c.country FROM Country c ORDER BY c.country")
    List<String> findDistinctCountries();
}
