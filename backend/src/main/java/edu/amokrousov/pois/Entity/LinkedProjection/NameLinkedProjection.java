package edu.amokrousov.pois.Entity.LinkedProjection;

import org.springframework.beans.factory.annotation.Value;

public interface NameLinkedProjection {
    long getId();

    @Value("#{target.name}")
    String getTitle();
}
