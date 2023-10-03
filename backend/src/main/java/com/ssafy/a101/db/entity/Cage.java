package com.ssafy.a101.db.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "cage")
public class Cage {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cage_id", updatable = false)
    private Long cageId;

    // fk 사용해야한다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private  User id;

    @Column(name = "snum", unique = true)
    private  String snum;

    @Column(name = "cage_name", updatable = true)
    private  String cage_name;

    @Column(name = "set_temp", updatable = true)
    private  Long set_temp;

    @Column(name = "set_hum", updatable = true)
    private  Long set_hum;

    @Column(name = "set_uv", updatable = true)
    private  Long set_uv;

    @Column(name = "created_at", updatable = true)
    private Date created_at;

    @Column(name = "category", updatable = true)
    private  String category;


    @Builder
    public Cage(User id, String snum,  String cage_name,  Long set_temp,  Long set_hum, Long set_uv,  Date created_at, String category){
        this.id = id;
        this.snum = snum;
        this.cage_name = cage_name;
        this.set_hum = set_hum;
        this.set_temp = set_temp;
        this.set_uv = set_uv;
        this.created_at = created_at;
        this.category = category;
    }

    public void update( String cage_name, String snum, Long set_temp, Long set_hum, Long set_uv, Date created_at, String category){
        this.cage_name = cage_name;
        this.snum = snum;
        this.set_temp = set_temp;
        this.set_hum = set_hum;
        this.set_uv = set_uv;
        this.created_at = created_at;
        this.category = category;
    }

    public void updateEnv(Long set_temp, Long set_hum, Long set_uv) {
        this.set_temp = set_temp;
        this.set_hum = set_hum;
        this.set_uv = set_uv;
    }
    
    public Cage() {}

    public Long getUserId() {
        if (this.id != null) {
            return this.id.getId();
        }
        return null;
    }
}
