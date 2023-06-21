package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.map.territory.Territory;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;

import java.util.List;

public class Mission07 extends Mission{

    public Mission07(long id){
        super(id);
        description = "Capture 18 territories and occupy each with two troops.";
    }

    @Override
    public boolean isMissionCompleted(Player player, Match match) {

        int territoryCounter = 0;

        List<Territory> territories = match.getMap().getTerritories();

        for (Territory territory : territories) {
            if(
                    territory.getOwner().equals(player)
                    && territory.getPlacedArmies() >= 2
            ) territoryCounter++;
        }

        return territoryCounter >= 18;
    }
}
