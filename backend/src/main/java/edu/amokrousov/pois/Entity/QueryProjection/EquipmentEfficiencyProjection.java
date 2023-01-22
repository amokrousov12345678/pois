package edu.amokrousov.pois.Entity.QueryProjection;

import edu.amokrousov.pois.Entity.Equipment;
import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentTypeLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "efficiency", types = {Equipment.class})
public interface EquipmentEfficiencyProjection {
    long getId();

    String getCustomer();

    String getName();

    EquipmentTypeLinkedProjection getEquipmentType();

    long getEfficiency();
}
