package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Equipment;
import edu.amokrousov.pois.Entity.LinkedProjection.DivisionLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentTypeLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {Equipment.class})
public interface EquipmentProjection {
    long getId();

    String getName();

    EquipmentTypeLinkedProjection getEquipmentType();

    DivisionLinkedProjection getOwnerDivision();

    ProjectLinkedProjection getUsingProject();
}

