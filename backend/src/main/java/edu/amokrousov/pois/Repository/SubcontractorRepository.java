package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Subcontractor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface SubcontractorRepository extends PagingAndSortingRepository<Subcontractor, Long> {
}
