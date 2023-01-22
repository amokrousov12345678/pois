package edu.amokrousov.pois.Repository.Equipment;

import edu.amokrousov.pois.Entity.Equipment;
import edu.amokrousov.pois.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.EntityManager;
import javax.persistence.TemporalType;
import java.math.BigInteger;
import java.util.Date;

public class EquipmentDistributionFinderImpl implements EquipmentDistributionFinder {

    @Autowired
    @Lazy
    EquipmentRepository equipmentRepository;

    @Autowired
    @Lazy
    ProjectRepository projectRepository;

    @Autowired
    EntityManager entityManager;

    @Override
    public Page<Equipment> getDistributionByDate(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date,
                                                 Pageable pageable) {

        return equipmentRepository.findAll(pageable).map(equipment -> {
            Equipment newEquipment = new Equipment();
            newEquipment.setId(equipment.getId());
            newEquipment.setName(equipment.getName());
            newEquipment.setEquipmentType(equipment.getEquipmentType());
            newEquipment.setUsingProject(null);
            BigInteger usingProjectId = ((BigInteger) entityManager.createNativeQuery("SELECT CASE WHEN " +
                    " (SELECT action_type FROM equipment_usage_log" +
                    " WHERE equipment_id=?1 AND date_time<=?2 ORDER BY id DESC LIMIT 1) = 'GET'" +
                    " THEN (SELECT project_id FROM equipment_usage_log WHERE equipment_id=?1 AND date_time<=?2" +
                    " ORDER BY id DESC LIMIT 1) ELSE NULL END")
                    .setParameter(1, equipment.getId())
                    .setParameter(2, date, TemporalType.DATE)
                    .getSingleResult());

            if (usingProjectId != null) {
                newEquipment.setUsingProject(projectRepository.findById(usingProjectId.longValue()).get());
            }
            return newEquipment;
        });
    }
}
