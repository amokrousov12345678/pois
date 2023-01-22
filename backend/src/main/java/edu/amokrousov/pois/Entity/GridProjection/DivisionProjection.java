package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Division;
import edu.amokrousov.pois.Entity.LinkedProjection.EmployeeLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.EquipmentLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "grid", types = {Division.class})
public interface DivisionProjection {
    long getId();

    String getName();

    EmployeeLinkedProjection getLeader();

    Set<EmployeeLinkedProjection> getEmployees();

    Set<EquipmentLinkedProjection> getOwnedEquipments();
}
