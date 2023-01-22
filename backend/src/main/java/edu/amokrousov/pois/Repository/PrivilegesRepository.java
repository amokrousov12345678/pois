package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Privilege;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;


@PreAuthorize("hasAuthority('PRIV_SUDO')")
public interface PrivilegesRepository extends PagingAndSortingRepository<Privilege, Long> {
}

