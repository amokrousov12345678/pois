package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.OtherEmployee;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_EMPLOYEES')")
public interface OtherEmployeeRepository extends PagingAndSortingRepository<OtherEmployee, Long> {

}
