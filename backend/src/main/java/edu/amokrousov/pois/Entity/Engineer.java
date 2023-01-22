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
@Table(name = "Engineers")
@DiscriminatorValue("engineers")
public class Engineer extends Employee {
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "leaderEngineer")
    private Set<Contract> leadedContracts;
}
