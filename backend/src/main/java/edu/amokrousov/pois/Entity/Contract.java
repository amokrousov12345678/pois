package edu.amokrousov.pois.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Contracts")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;

    @NotNull
    private String customer;

    @NotNull
    private String name;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date beginDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private static final String SUM_COST_EXPR = "(SELECT COALESCE(SUM(pw.cost), 0) FROM project_works pw"
            + " INNER JOIN projects AS p ON pw.project_id = p.id"
            + " INNER JOIN contracts_projects AS cp ON p.id = cp.projects_id"
            + " WHERE cp.associated_contracts_id = id)";

    private static final String COUNT_WORKERS_EXPR = "(SELECT COUNT(1) FROM"
            + " contracts_workgroup_employees ce WHERE ce.working_contracts_id=id)";

    @NotNull
    @Formula(SUM_COST_EXPR)
    public long totalCost;


    @Formula("(" + SUM_COST_EXPR + "/" + COUNT_WORKERS_EXPR + ")")
    private double efficiency;

    @ManyToMany
    private Set<Project> projects;

    @ManyToMany
    private Set<Employee> workgroupEmployees;

    @ManyToOne(fetch = FetchType.LAZY)
    private Engineer leaderEngineer;
}
