package edu.amokrousov.pois.Entity.GridProjection;

import edu.amokrousov.pois.Entity.Employee;
import edu.amokrousov.pois.Entity.LinkedProjection.DivisionLinkedProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "grid", types = {Employee.class})
public interface EmployeeProjection {
    long getId();

    String getLastName();

    String getFirstName();

    String getPatronymic();

    Date getBirthDate();

    int getAge();

    DivisionLinkedProjection getDivision();

    String getEntityType();
}
