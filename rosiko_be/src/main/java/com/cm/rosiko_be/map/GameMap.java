package com.cm.rosiko_be.map;

import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.map.continent.ContinentsDAO;
import com.cm.rosiko_be.map.territory.TerriroriesDAO;
import com.cm.rosiko_be.map.territory.Territory;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class GameMap implements Serializable {
    private List<Continent> continents;
    private List<Territory> territories;

    public GameMap(){
        continents = ContinentsDAO.getContinents();
        territories = TerriroriesDAO.getTerritories();
    }

    public Territory getTerritory(String id){
        Territory targetTerritory = null;

        for (Territory territory: territories) {
            if(territory.getId().equals(id)){
                targetTerritory = territory;
                break;
            }
        }

        return targetTerritory;
    }
}
