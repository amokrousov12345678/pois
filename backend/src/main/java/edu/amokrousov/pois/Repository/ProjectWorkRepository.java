package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.ProjectWork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface ProjectWorkRepository extends PagingAndSortingRepository<ProjectWork, Long> {
    Page<ProjectWork> findByProject_Id(Long id, Pageable pageable);
}

