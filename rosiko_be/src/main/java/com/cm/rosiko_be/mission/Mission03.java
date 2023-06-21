package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;

import java.util.List;

public class Mission03 extends Mission{

    public Mission03(long id){
        super(id);
        description = "Capture North America and Africa.";
    }

    @Override
    public boolean isMissionCompleted(Player player, Match match) {

        boolean northAmerica = false;
        boolean africa = false;

        //Lista dei continenti posseduti dal giocatore
        List<Continent> continents = match.getContinentsOwned(player);

        for (Continent continent : continents) {
            //Controlla che abbia preso il Nord Amrica
            if(continent.getId().equals("north_america")) northAmerica = true;
            //Controlla che abbia preso l'Africa
            if(continent.getId().equals("africa")) africa = true;
        }

        return northAmerica && africa;
    }
}
