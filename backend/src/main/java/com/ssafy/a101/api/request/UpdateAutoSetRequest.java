package com.ssafy.a101.api.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateAutoSetRequest {
    private String time;
    private Long set_temp;
    private Long set_hum;
    private Long set_uv;
}
