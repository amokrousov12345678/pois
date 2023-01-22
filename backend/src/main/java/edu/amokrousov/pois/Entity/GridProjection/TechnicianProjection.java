package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentTypeLinkedProjection;
import edu.amokrousov.pois.Entity.Technician;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "grid", types = {Technician.class})
public interface TechnicianProjection extends EmployeeProjection {
    Set<EquipmentTypeLinkedProjection> getServableEquipmentTypes();
}

