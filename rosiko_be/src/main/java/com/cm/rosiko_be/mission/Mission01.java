package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;

import java.util.List;

public class Mission01 extends Mission{


    public Mission01(long id){
        super( id);
        description = "Capture Europe, Oceania and one other continent.";
    }

    @Override
    public boolean isMissionCompleted(Player player, Match match) {

        boolean oceania = false;
        boolean europe = false;
        boolean thirdContinent = false;

        //Lista dei continenti posseduti dal giocatore
        List<Continent> continents = match.getContinentsOwned(player);

        for (Continent continent : continents) {
            //Controlla che abbia preso l'oceania
            if(continent.getId().equals("oceania")) oceania = true;
            //Controlla che abbia preso l'europa
            if(continent.getId().equals("europe")) europe = true;
            //Controlla che abbia preso un terzo continente
            if(!continent.getId().equals("oceania") && !continent.getId().equals("europe")) thirdContinent = true;
        }

        return oceania && europe && thirdContinent;
    }
}
