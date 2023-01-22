package edu.amokrousov.pois.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Patents")
public class Patent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date issueDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Constructor constructor;
}
