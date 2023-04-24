package com.cm.rosiko_be.data;

import com.cm.rosiko_be.dao.ContinentsDAO;
import com.cm.rosiko_be.dao.TerriroriesDAO;
import lombok.Data;

import java.util.List;

@Data
public class GameMap {
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
