package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Equipment;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Equipment.class})
public interface EquipmentLinkedProjection extends NameLinkedProjection {
}
