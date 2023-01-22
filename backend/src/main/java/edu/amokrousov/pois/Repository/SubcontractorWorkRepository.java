package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.SubcontractorWork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface SubcontractorWorkRepository extends PagingAndSortingRepository<SubcontractorWork, Long> {
    Page<SubcontractorWork> findByProject_Id(Long id, Pageable pageable);
}
