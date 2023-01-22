package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.OtherEmployee;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "grid", types = {OtherEmployee.class})
public interface OtherEmployeeProjection extends EmployeeProjection {
    String getDescription();
}

