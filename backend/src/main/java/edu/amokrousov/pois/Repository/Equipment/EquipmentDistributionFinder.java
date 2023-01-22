package edu.amokrousov.pois.Repository.Equipment;

import edu.amokrousov.pois.Entity.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public interface EquipmentDistributionFinder {
    Page<Equipment> getDistributionByDate(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date, Pageable pageable);
}
