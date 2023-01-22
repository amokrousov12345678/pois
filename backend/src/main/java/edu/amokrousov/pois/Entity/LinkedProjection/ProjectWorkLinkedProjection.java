package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.ProjectWork;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {ProjectWork.class})
public interface ProjectWorkLinkedProjection extends NameLinkedProjection {

}
