package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Engineer;
import edu.amokrousov.pois.Entity.LinkedProjection.ContractLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "grid", types = {Engineer.class})
public interface EngineerProjection extends EmployeeProjection {
    Set<ContractLinkedProjection> getLeadedContracts();
}
