package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Date;
import java.util.List;

@PreAuthorize("hasAuthority('PRIV_EMPLOYEES')")
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
    Page<Employee> findByIdIn(List<Long> ids, Pageable pageable);

    //Iterable in param doesn't work as expected, with list you should pass like ids=1,2,3
    Page<Employee> findByDivision_Id(Long id, Pageable pageable);

    Page<Employee> findByWorkingProjects_Id(Long id, Pageable pageable);

    Page<Employee> findByWorkingContracts_Id(Long id, Pageable pageable);

    @Query("SELECT e FROM Employee e WHERE" +
            " (:entityType IS NULL OR e.entityType = :entityType)" +
            " AND (:ageFrom IS NULL OR e.age >= :ageFrom)" +
            " AND (:ageTo IS NULL OR e.age <= :ageTo)" +
            " AND (:divisionId IS NULL OR e.division.id = :divisionId)")
    Page<Employee> findByEntityTypeAndAgeBetweenAndDivision_Id(String entityType,
                                                               Integer ageFrom, Integer ageTo,
                                                               Long divisionId,
                                                               Pageable pageable);

    @Query("SELECT e FROM Employee e JOIN e.workingProjects wp WHERE" +
            " (:entityType IS NULL OR e.entityType = :entityType)" +
            " AND (:id IS NULL OR wp.id = :id)")
    Page<Employee> findByEntityTypeAndProjectId(String entityType, Long id, Pageable pageable);

    @Query("SELECT DISTINCT e FROM Employee e JOIN e.workingProjects wp WHERE" +
            " (:entityType IS NULL OR e.entityType = :entityType)" +
            " AND (wp.beginDate <= :dateTo AND (wp.endDate IS NULL OR :dateFrom <= wp.endDate))")
    Page<Employee> findByEntityTypeAndProjectDate(String entityType,
                                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo,
                                                  Pageable pageable);

    @Query("SELECT DISTINCT e FROM Employee e JOIN e.workingContracts wc WHERE" +
            " (:entityType IS NULL OR e.entityType = :entityType)" +
            " AND (wc.beginDate <= :dateTo AND (wc.endDate IS NULL OR :dateFrom <= wc.endDate))")
    Page<Employee> findByEntityTypeAndContractDate(String entityType,
                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo,
                                                   Pageable pageable);
}
