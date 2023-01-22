package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.EquipmentUsage;
import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "grid", types = {EquipmentUsage.class})
public interface EquipmentUsageProjection {
    long getId();

    String getActionType();

    Date getDateTime();

    EquipmentLinkedProjection getEquipment();

    ProjectLinkedProjection getProject();
}
