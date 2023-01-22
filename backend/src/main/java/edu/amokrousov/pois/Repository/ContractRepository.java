package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Date;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface ContractRepository extends PagingAndSortingRepository<Contract, Long> {
    @Query("SELECT c FROM Contract c WHERE (:dateFrom <= :dateTo)"
            + " AND (c.beginDate <= :dateTo AND (c.endDate IS NULL OR :dateFrom <= c.endDate))")
    Page<Contract> findExecutingInDateRange(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo, Pageable pageable);

    @Query("SELECT c FROM Contract c WHERE c.endDate BETWEEN :dateFrom AND :dateTo")
    Page<Contract> findFinishedInDateRange(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo, Pageable pageable);

    @Query("SELECT c FROM Contract c JOIN c.workgroupEmployees w WHERE (:dateFrom <= :dateTo)"
            + " AND (c.beginDate <= :dateTo AND (c.endDate IS NULL OR :dateFrom <= c.endDate))"
            + " AND (w.id = :id)")
    Page<Contract> findByWorkerIdInDateRange(Long id, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateFrom,
                                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateTo, Pageable pageable);

    Page<Contract> findByEndDateIsNotNull(Pageable pageable);
}
