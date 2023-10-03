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
public class UpdateAlarmRequest {
    private String name;
    private Long cycle;
    private Date recent;
}
