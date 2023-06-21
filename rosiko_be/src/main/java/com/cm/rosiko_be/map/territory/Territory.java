package com.cm.rosiko_be.map.territory;

import com.cm.rosiko_be.enums.CardType;
import com.cm.rosiko_be.enums.Color;
import com.cm.rosiko_be.player.Player;
import lombok.Data;
import java.util.List;

//Represent a single nation in the map
@Data
public class Territory {
    private String id;
    private String name;
    private String continentId;
    private CardType cardType;
    private List<String> neighbouringTerritoriesId;
    private Player owner;
    private Color color;
    private int placedArmies = 0;
    private boolean isSelectable = false;


    public void setOwner(Player owner) {
        this.owner = owner;
        this.color = owner.getColor();
    }

    public void removeArmies(int armies) { this.placedArmies -= armies; }

    public void addArmies(int armies) {
        this.placedArmies += armies;
    }

    public boolean isBordering(Territory territory){
        boolean isBordering = false;
        for(String neighboringID : neighbouringTerritoriesId){
            if(territory.getId().equals(neighboringID)){
                isBordering = true;
                break;
            }
        }
        return isBordering;
    }
}
