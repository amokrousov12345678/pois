package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Contract;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Contract.class})
public interface ContractLinkedProjection extends NameLinkedProjection {
}