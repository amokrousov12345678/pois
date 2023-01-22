package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Patent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_EMPLOYEES')")
public interface PatentRepository extends PagingAndSortingRepository<Patent, Long> {
    Page<Patent> findByConstructor_Id(Long id, Pageable pageable);
}

