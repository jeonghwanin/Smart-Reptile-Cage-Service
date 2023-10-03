package com.ssafy.a101.api.response;

import com.ssafy.a101.db.entity.Store;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreResponse {
    private final Long store_id;
    private final String name;
    private final String itme;
    private final String url;
    private final Long price;
    private final String photo;

    public StoreResponse(Store store) {
        this.store_id = store.getStore_id();
        this.name = store.getName();
        this.itme = store.getItem();
        this.url = store.getUrl();
        this.price = store.getPrice();
        this.photo = store.getPhoto();
    }
}
