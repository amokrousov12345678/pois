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
@Table(name = "Projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date beginDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private static final String SUM_COST_EXPR = "(SELECT COALESCE(SUM(pw.cost), 0) "
            + " FROM project_works pw WHERE pw.project_id=id)";

    private static final String COUNT_WORKERS_EXPR = "(SELECT COUNT(1) FROM"
            + " projects_workgroup_employees ce WHERE ce.working_projects_id=id)";

    @NotNull
    @Formula(SUM_COST_EXPR)
    public long totalCost;

    @Formula("(" + SUM_COST_EXPR + "/" + COUNT_WORKERS_EXPR + ")")
    private double efficiency;

    @ManyToMany(mappedBy = "projects")
    private Set<Contract> associatedContracts;

    @ManyToOne(fetch = FetchType.LAZY)
    private Constructor leaderConstructor;

    @ManyToMany
    private Set<Employee> workgroupEmployees;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
    private Set<SubcontractorWork> subcontractorWorks;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usingProject")
    private Set<Equipment> usedEquipment;

    @OneToOne
    private Constructor leader;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
    private Set<EquipmentUsage> equipmentUsagesLog;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project"/*,
            cascade = CascadeType.ALL, orphanRemoval = true*/)
    private Set<ProjectWork> projectWorks;
}
