package edu.amokrousov.pois.Entity.QueryProjection;

import edu.amokrousov.pois.Entity.Equipment;
import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentTypeLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "distribution", types = {Equipment.class})
public interface EquipmentDistributionProjection {
    long getId();

    String getName();

    EquipmentTypeLinkedProjection getEquipmentType();

    ProjectLinkedProjection getUsingProject();
}
