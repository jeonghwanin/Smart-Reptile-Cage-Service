package com.ssafy.a101.api.response;

import com.ssafy.a101.db.entity.Dictionary;
import lombok.Getter;

@Getter
public class DictionaryResponse {
    private final Long id;
    private final String spices;
    private final String lifespan;
    private final String feed;
    private final String feed_cycle;
    private final String temp;
    private final String lighting;
    private final String humidity;
    private final String info;
    private final String environment;
    private final String home;
    private final String img;


    public DictionaryResponse(Dictionary dictionary) {
        this.id = dictionary.getId();
        this.spices = dictionary.getSpices();
        this.lifespan = dictionary.getLifespan();
        this.feed = dictionary.getFeed();
        this.feed_cycle = dictionary.getFeed_cycle();
        this.temp = dictionary.getTemp();
        this.lighting = dictionary.getLighting();
        this.humidity = dictionary.getHumidity();
        this.info = dictionary.getInfo();
        this.environment = dictionary.getEnvironment();
        this.home = dictionary.getHome();
        this.img = dictionary.getImg();
    }
}
