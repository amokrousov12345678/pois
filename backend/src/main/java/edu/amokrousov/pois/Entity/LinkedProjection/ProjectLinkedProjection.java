package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Project;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Project.class})
public interface ProjectLinkedProjection extends NameLinkedProjection {

}