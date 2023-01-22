package edu.amokrousov.pois.Repository.Equipment;

import edu.amokrousov.pois.Entity.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface EquipmentRepository extends PagingAndSortingRepository<Equipment, Long>, EquipmentDistributionFinder {
    Page<Equipment> findByUsingProject_Id(Long id, Pageable pageable);
}
