package com.cm.rosiko_be.mission;

import lombok.Data;

import java.io.Serializable;

@Data
public class MissionDTO implements Serializable {

    private long id;
    private String description;

    public MissionDTO(long id, String description){
        this.id = id;
        this.description = description;
    }
}
