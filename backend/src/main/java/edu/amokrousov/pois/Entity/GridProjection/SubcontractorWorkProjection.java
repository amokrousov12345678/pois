package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.LinkedProjection.ProjectLinkedProjection;
import edu.amokrousov.pois.Entity.LinkedProjection.SubcontractorLinkedProjection;
import edu.amokrousov.pois.Entity.SubcontractorWork;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {SubcontractorWork.class})
public interface SubcontractorWorkProjection {
    long getId();

    String getName();

    SubcontractorLinkedProjection getSubcontractor();

    ProjectLinkedProjection getProject();

    int getCost();
}
