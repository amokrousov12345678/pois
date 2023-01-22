package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Engineer;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Engineer.class})
public interface EngineerLinkedProjection extends EmployeeLinkedProjection {
}