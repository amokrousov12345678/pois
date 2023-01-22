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
@Table(name = "Subcontractors")
public class Subcontractor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;

    @NotNull
    private String name;

    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "subcontractor")
    private Set<SubcontractorWork> subcontractorWorks;
}
