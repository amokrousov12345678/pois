package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Subcontractor;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {Subcontractor.class})
public interface SubcontractorProjection {
    long getId();

    String getName();

    String getDescription();
}
