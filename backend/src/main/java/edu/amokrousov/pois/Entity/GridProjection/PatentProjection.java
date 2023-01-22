package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.LinkedProjection.ConstructorLinkedProjection;
import edu.amokrousov.pois.Entity.Patent;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {Patent.class})
public interface PatentProjection {
    long getId();

    String getName();

    String getDescription();

    String getIssueDate();

    ConstructorLinkedProjection getConstructor();

}
