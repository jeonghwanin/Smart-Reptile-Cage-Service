package com.ssafy.a101.db.entity;


import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class AutoSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "set_id" , updatable = false)
    private Long set_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cage_id", referencedColumnName = "cage_id")
    private Cage cageId;

    @Column(name = "time")
    private String time;

    @Column(name = "set_temp")
    private Long set_temp;

    @Column(name = "set_hum")
    private Long set_hum;

    @Column(name = "set_uv")
    private Long set_uv;

    @Builder
    public AutoSet(Cage cageId,String time, Long set_temp, Long set_hum, Long set_uv){
        this.cageId = cageId;
        this.time = time;
        this.set_temp = set_temp;
        this.set_hum = set_hum;
        this.set_uv = set_uv;
    }

    public void update(String time, Long set_temp, Long set_hum, Long set_uv){
        this.time = time;
        this.set_temp = set_temp;
        this.set_hum = set_hum;
        this.set_uv = set_uv;
    }

    public Long getCageId() {
        if (this.cageId != null) {
            return this.cageId.getCageId();
        }
        return null;
    }

    public AutoSet() {}

}
