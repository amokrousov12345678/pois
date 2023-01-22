package edu.amokrousov.pois.Entity.QueryProjection;

import edu.amokrousov.pois.Entity.Contract;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "efficiency", types = {Contract.class})
public interface ContractEfficiencyProjection {
    long getId();

    String getName();

    Date getBeginDate();

    Date getEndDate();

    double getEfficiency();
}
