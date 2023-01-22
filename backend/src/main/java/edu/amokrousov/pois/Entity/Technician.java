package edu.amokrousov.pois.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Technicians")
@DiscriminatorValue("technicians")
public class Technician extends Employee {
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<EquipmentType> servableEquipmentTypes;
}
