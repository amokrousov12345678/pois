package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.EquipmentType;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {EquipmentType.class})
public interface EquipmentTypeLinkedProjection extends NameLinkedProjection {
}
