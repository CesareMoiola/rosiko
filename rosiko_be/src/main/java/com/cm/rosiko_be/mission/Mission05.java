package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;

import java.util.List;

public class Mission05 extends Mission{

    public Mission05(long id){
        super(id);
        description = "Capture North America and Oceania.";
    }

    @Override
    public boolean isMissionCompleted(Player player, Match match) {

        boolean northAmerica = false;
        boolean oceania = false;

        //Lista dei continenti posseduti dal giocatore
        List<Continent> continents = match.getContinentsOwned(player);

        for (Continent continent : continents) {
            //Controlla che abbia preso il Nord America
            if(continent.getId().equals("north_america")) northAmerica = true;
            //Controlla che abbia preso l'Oceania
            if(continent.getId().equals("oceania")) oceania = true;
        }

        return northAmerica && oceania;
    }
}
