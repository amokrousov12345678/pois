package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.EquipmentUsage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface EquipmentUsageRepository extends PagingAndSortingRepository<EquipmentUsage, Long> {
    Page<EquipmentUsage> findByProject_Id(Long id, Pageable pageable);

    Page<EquipmentUsage> findByProject_AssociatedContracts_Id(Long id, Pageable pageable);
}
