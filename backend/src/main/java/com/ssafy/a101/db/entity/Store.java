package com.ssafy.a101.db.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "store_id", updatable = false) // 프라이머리키를 받고, 널값 허용 x
    private Long store_id;

    @Column(name = "name", updatable = false)
    private String name;

    @Column(name = "item", updatable = false)
    private String item;

    @Column(name = "url", updatable = false)
    private String url;

    @Column(name = "price", updatable = false)
    private Long price;

    @Column(name = "photo", updatable = false)
    private String photo;

    //builder - Lombok 어노테이션으로, 빌더 패턴을 자동으로 생성합니다.
    // 이를 통해 객체를 생성하면서 메서드 체이닝
    @Builder
    public void Store(Long store_id, String name, String item, String url, Long price, String photo) {
        this.store_id = store_id;
        this.name = name;
        this.item = item;
        this.url = url;
        this.price = price;
        this.photo = photo;
    }


    //기본 생성자 정의
    public Store(){
    }

}
