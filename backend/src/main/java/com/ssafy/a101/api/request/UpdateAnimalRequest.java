package com.ssafy.a101.api.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateAnimalRequest {
    private  String name;
    private  String gender;
    private Date birth;
    private  String issue;
    private  Date created_at;
    private  String photo;
}
