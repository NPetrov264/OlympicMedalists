package com.npetrov.OlympicMedalists.repository;

import com.npetrov.OlympicMedalists.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, String> {
}
