package com.cm.rosiko_be.data;

import lombok.Data;

import java.util.List;

@Data
public class Continent {
    private String id;
    private String name;
    private int bonusArmies;
    private List<String> territories;
}
