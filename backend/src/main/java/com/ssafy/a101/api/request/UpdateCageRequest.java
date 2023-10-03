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
public class UpdateCageRequest {
   // private Long id;
    private String snum;
    private String cage_name;
    private Long set_temp;
    private Long set_hum;
    private Long set_uv;
    private Date created_at;
    private String category;


}
