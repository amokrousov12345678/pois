package edu.amokrousov.pois.Entity.LinkedProjection;

import edu.amokrousov.pois.Entity.Employee;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "linked", types = {Employee.class})
public interface EmployeeLinkedProjection {
    long getId();

    @Value("#{target.lastName} #{target.firstName} #{target.patronymic}")
    String getTitle();
}