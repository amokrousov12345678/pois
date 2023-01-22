package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Subcontractor;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Subcontractor.class})
public interface SubcontractorLinkedProjection extends NameLinkedProjection {
}
