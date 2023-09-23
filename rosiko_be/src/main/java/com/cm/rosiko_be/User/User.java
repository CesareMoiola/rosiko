package com.cm.rosiko_be.User;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private String id;
    private String socketId;
    private Long currentMatchId;

    public User(String id){
        this.id=id;
    }
}
