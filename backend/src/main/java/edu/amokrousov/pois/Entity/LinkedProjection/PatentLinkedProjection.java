package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Patent;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Patent.class})
public interface PatentLinkedProjection extends NameLinkedProjection {
}