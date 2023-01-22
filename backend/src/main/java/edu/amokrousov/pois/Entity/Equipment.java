package edu.amokrousov.pois.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private EquipmentType equipmentType;

    @ManyToOne(fetch = FetchType.LAZY)
    private Division ownerDivision;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project usingProject;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usedEquipment")
    private Set<ProjectWork> usingProjectWorks;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "equipment"/*,
            cascade = CascadeType.ALL, orphanRemoval = true*/)
    private Set<EquipmentUsage> equipmentUsageLog;

    @Formula("(SELECT COALESCE(SUM(pw.cost), 0) FROM project_works pw"
            + " WHERE pw.used_equipment_id=id AND pw.done)")
    private long efficiency;
}
