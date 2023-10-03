package com.ssafy.a101.db.entity;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "dict")
public class Dictionary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name ="spices" , updatable = false)
    private String spices;

    @Column(name = "lifespan", nullable = true)
    private String lifespan;

    @Column(name = "feed", nullable = true)
    private String feed;

    @Column(name = "feed_cycle", nullable = true)
    private String feed_cycle;

    @Column(name = "temp", nullable = true)
    private String temp;

    @Column(name = "lighting", nullable = true)
    private String lighting;

    @Column(name = "humidity", nullable = true)
    private String humidity;

    @Column(name = "info", nullable = true)
    private String info;

    @Column(name = "environment", nullable = true)
    private String environment;

    @Column(name = "home", nullable = true)
    private String home;

    @Column(name = "img", nullable = true)
    private String img;

    @Builder
    public Dictionary(String spices, String lifespan, String feed, String feed_cycle, String temp, String lighting, String humidity,String info, String environment, String home, String img ) {
    this.spices = spices;
    this.lifespan = lifespan;
    this.feed = feed;
    this.feed_cycle = feed_cycle;
    this.temp = temp;
    this.lighting = lighting;
    this.humidity = humidity;
    this.info = info;
    this.environment = environment;
    this.home =  home;
    this.img = img;

    }

    public void update(String spices ,String lifespan, String feed, String feed_cycle, String temp, String lighting, String humidity,String info, String environment, String home, String img) {
        this.spices = spices;
        this.lifespan = lifespan;
        this.feed = feed;
        this.feed_cycle = feed_cycle;
        this.temp = temp;
        this.lighting = lighting;
        this.humidity = humidity;
        this.info = info;
        this.environment = environment;
        this.home =  home;
        this.img = img;

    }

    public Dictionary(){  }

}
