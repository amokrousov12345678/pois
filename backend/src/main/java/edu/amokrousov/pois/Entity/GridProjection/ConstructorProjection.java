package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Constructor;
import edu.amokrousov.pois.Entity.LinkedProjection.PatentLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "grid", types = {Constructor.class})
public interface ConstructorProjection extends EmployeeProjection {
    Set<PatentLinkedProjection> getPatents();

    Set<ProjectLinkedProjection> getLeadedProjects();
}
