package edu.amokrousov.pois.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "OtherEmployees")
@DiscriminatorValue("otherEmployees")
public class OtherEmployee extends Employee {
    private String description;
}
