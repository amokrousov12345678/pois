package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.LinkedProjection.*;
import edu.amokrousov.pois.Entity.Project;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

@Projection(name = "grid", types = {Project.class})
public interface ProjectProjection {
    long getId();

    String getName();

    Date getBeginDate();

    Date getEndDate();

    int getTotalCost();

    Set<ProjectLinkedProjection> getAssociatedContracts();

    Set<EmployeeLinkedProjection> getWorkgroupEmployees();

    ConstructorLinkedProjection getLeaderConstructor();

    Set<ProjectWorkLinkedProjection> getProjectWorks();
}
