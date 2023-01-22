package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Privilege;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Privilege.class})
public interface PrivilegeLinkedProjection {
    long getId();

    @Value("#{target.name}")
    String getTitle();
}