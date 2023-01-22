package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Engineer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@PreAuthorize("hasAuthority('PRIV_EMPLOYEES')")
public interface EngineerRepository extends PagingAndSortingRepository<Engineer, Long> {
    Page<Engineer> findByIdIn(List<Long> ids, Pageable pageable);
}
