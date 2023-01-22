package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import edu.amokrousov.pois.Entity.ProjectWork;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {ProjectWork.class})
public interface ProjectWorkProjection {
    long getId();

    String getName();

    int getCost();

    boolean getDone();

    EquipmentLinkedProjection getUsedEquipment();

    ProjectLinkedProjection getProject();
}
