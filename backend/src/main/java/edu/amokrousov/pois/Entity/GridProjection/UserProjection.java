package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.LinkedProjection.PrivilegeLinkedProjection;
import edu.amokrousov.pois.Entity.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "grid", types = {User.class})
public interface UserProjection {
    long getId();

    String getUsername();

    String getEmail();

    Set<PrivilegeLinkedProjection> getPrivileges();
}
