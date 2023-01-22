package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Constructor;
import edu.amokrousov.pois.Entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@PreAuthorize("hasAuthority('PRIV_EMPLOYEES')")
public interface ConstructorRepository extends PagingAndSortingRepository<Constructor, Long> {
    Page<Employee> findByIdIn(List<Long> ids, Pageable pageable);
}