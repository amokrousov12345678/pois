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
@Table(name = "Constructors")
@DiscriminatorValue("constructors")
public class Constructor extends Employee {
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "constructor"/*,
            cascade = CascadeType.ALL, orphanRemoval = true*/)
    private Set<Patent> patents;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "leaderConstructor")
    private Set<Project> leadedProjects;
}
