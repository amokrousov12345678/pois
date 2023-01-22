package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Division;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Division.class})
public interface DivisionLinkedProjection extends NameLinkedProjection {
}