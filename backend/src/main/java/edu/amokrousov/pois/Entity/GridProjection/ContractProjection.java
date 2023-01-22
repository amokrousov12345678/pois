package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Contract;
import edu.amokrousov.pois.Entity.LinkedProjection.EmployeeLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.EngineerLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

@Projection(name = "grid", types = {Contract.class})
public interface ContractProjection {
    long getId();

    String getCustomer();

    String getName();

    Date getBeginDate();

    Date getEndDate();

    int getTotalCost();

    Set<ProjectLinkedProjection> getProjects();

    Set<EmployeeLinkedProjection> getWorkgroupEmployees();

    EngineerLinkedProjection getLeaderEngineer();

}
