package com.santhosh.jobportal.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterResponse {
    private Integer id;
    private String name;
    private String email;
    private String password;
}
