package com.ssafy.a101.db.entity;


import lombok.*;
import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cage_id", referencedColumnName = "cage_id")
    private Cage cageId;

    // 지금 사용 할 이름, 전 테이블에서 사용했던 이름을 입력해준다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dict_id", referencedColumnName = "id")
    private Dictionary dict_id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "birth" )
    private Date birth;

    @Column(name = "issue")
    private String issue;

    @Column(name = "created_at", nullable = false)
    private Date created_at;

    @Column(name = "photo")
    private String photo;

    @Builder
    public Animal(Cage cageId, Dictionary dict_id, String name ,String gender, Date birth, String issue, Date created_at, String photo){
        this.cageId = cageId;
        this.dict_id = dict_id;
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.issue = issue;
        this.created_at = created_at;
        this.photo = photo;

    }

    public void update(String name ,String gender, Date birth, String issue, Date created_at, String photo){
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.issue = issue;
        this.created_at = created_at;
        this.photo = photo;

    }
    public Long getCageId() {
        if (this.cageId != null) {
            return this.cageId.getCageId();
        }
        return null;
    }

    public Long getDictId() {
        if (this.dict_id != null) {
            return this.dict_id.getId();
        }
        return null;
    }

    public Animal(){}

}
