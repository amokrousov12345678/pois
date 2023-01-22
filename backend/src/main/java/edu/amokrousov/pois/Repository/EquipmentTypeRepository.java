package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.EquipmentType;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('PRIV_CONTRACTS')")
public interface EquipmentTypeRepository extends PagingAndSortingRepository<EquipmentType, Long> {
}
