package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Privilege;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {Privilege.class})
public interface PrivilegeProjection {
    long getId();

    String getName();
}
