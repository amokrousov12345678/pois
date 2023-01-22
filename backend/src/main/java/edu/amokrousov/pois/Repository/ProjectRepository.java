package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Date;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE (:dateFrom <= :dateTo)" +
            " AND (p.beginDate <= :dateTo AND (p.endDate IS NULL OR :dateFrom <= p.endDate))")
    Page<Project> findExecutingInDateRange(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo, Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.endDate BETWEEN :dateFrom AND :dateTo")
    Page<Project> findFinishedInDateRange(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo, Pageable pageable);

    @Query("SELECT p FROM Project p JOIN p.workgroupEmployees w WHERE (:dateFrom <= :dateTo)"
            + " AND (p.beginDate <= :dateTo AND (p.endDate IS NULL OR :dateFrom <= p.endDate))"
            + " AND (w.id = :id)")
    Page<Project> findByWorkerIdInDateRange(Long id, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo, Pageable pageable);

    Page<Project> findByEndDateIsNotNull(Pageable pageable);
}

