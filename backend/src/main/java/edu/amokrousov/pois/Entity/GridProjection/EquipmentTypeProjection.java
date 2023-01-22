package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.EquipmentType;
import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "grid", types = {EquipmentType.class})
public interface EquipmentTypeProjection {
    long getId();

    String getName();

    Set<EquipmentLinkedProjection> getEquipment();
}

