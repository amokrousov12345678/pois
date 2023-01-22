package edu.amokrousov.pois.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "EquipmentUsageLog")
public class EquipmentUsage {
    enum ActionType {
        GET,
        RELEASE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ActionType actionType;

    @NotNull
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Equipment equipment;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

}
