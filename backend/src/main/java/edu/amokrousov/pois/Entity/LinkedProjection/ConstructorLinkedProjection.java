package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Constructor;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Constructor.class})
public interface ConstructorLinkedProjection extends EmployeeLinkedProjection {
}
