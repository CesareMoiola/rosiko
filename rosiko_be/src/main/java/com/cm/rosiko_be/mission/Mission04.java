package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;

import java.util.List;

public class Mission04 extends Mission{

    public Mission04(long id){
        super(id);
        description = "Capture Asia and South America.";
    }

    @Override
    public boolean isMissionCompleted(Player player, Match match) {

        boolean asia = false;
        boolean southAmerica = false;

        //Lista dei continenti posseduti dal giocatore
        List<Continent> continents = match.getContinentsOwned(player);

        for (Continent continent : continents) {
            //Controlla che abbia preso l'Asia
            if(continent.getId().equals("asia")) asia = true;
            //Controlla che abbia preso il Sud America
            if(continent.getId().equals("south_america")) southAmerica = true;
        }

        return asia && southAmerica;
    }
}
