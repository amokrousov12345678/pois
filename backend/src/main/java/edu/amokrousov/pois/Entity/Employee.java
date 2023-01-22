package edu.amokrousov.pois.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Employees")
@Inheritance(strategy = InheritanceType.JOINED)
@RestResource(rel = "employees")
@DiscriminatorColumn(name = "entityType")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(name = "entityType", insertable = false, updatable = false)
    private String entityType;

    @NotNull
    private String lastName;

    @NotNull
    private String firstName;

    private String patronymic;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Division division;

    @Formula("year_diff(birth_date, CURDATE())")
    private int age;

    @ManyToMany(mappedBy = "workgroupEmployees")
    private Set<Contract> workingContracts;

    @ManyToMany(mappedBy = "workgroupEmployees")
    private Set<Project> workingProjects;
}
