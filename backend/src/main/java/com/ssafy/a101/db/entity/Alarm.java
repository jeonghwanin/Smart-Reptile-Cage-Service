package com.ssafy.a101.db.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="arm_id" , updatable = false)
    private Long arm_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cage_id", referencedColumnName = "cage_id")
    private Cage cageId;


    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "cycle", nullable = false)
    private Long cycle;


    @Column(name = "recent", nullable = false)
    private Date recent;

    @Builder
    public Alarm(Cage cageId, String name, Long cycle, Date recent){
        this.cageId =  cageId;
        this.name = name;
        this.cycle = cycle;
        this.recent = recent;
    }

    public void update(String name, Long cycle, Date recent){
        this.name = name;
        this.cycle = cycle;
        this.recent = recent;
    }

    public Long getCageId() {
        if (this.cageId != null) {
            return this.cageId.getCageId();
        }
        return null;
    }

    public Alarm(){}



}
