package edu.amokrousov.pois.Entity.QueryProjection;

import edu.amokrousov.pois.Entity.Project;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "efficiency", types = {Project.class})
public interface ProjectEfficiencyProjection {
    long getId();

    String getName();

    Date getBeginDate();

    Date getEndDate();

    double getEfficiency();
}
