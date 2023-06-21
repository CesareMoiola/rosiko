package com.cm.rosiko_be.map.territory;

import com.cm.rosiko_be.enums.CardType;
import com.cm.rosiko_be.enums.Color;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

@Data
public class TerritoryDTO implements Serializable {
    private String id;
    private String name;
    private String continentId;
    private CardType cardType;
    private List<String> neighbouringTerritoriesId;
    private String ownerId;
    private Color color;
    private int placedArmies = 0;
    private boolean isSelectable = false;
}
