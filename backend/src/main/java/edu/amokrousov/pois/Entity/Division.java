package edu.amokrousov.pois.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Divisions")
public class Division {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;

    @NotNull
    private String name;

    @OneToOne
    private Employee leader;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "division")
    private Set<Employee> employees;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ownerDivision")
    private Set<Equipment> ownedEquipments;

}
