package com.cm.rosiko_be.map.continent;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Continent implements Serializable {
    private String id;
    private String name;
    private int bonusArmies;
    private List<String> territories;
}
