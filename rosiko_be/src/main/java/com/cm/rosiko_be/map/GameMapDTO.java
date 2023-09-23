package com.cm.rosiko_be.map;

import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.map.territory.TerritoryDTO;
import lombok.Data;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class GameMapDTO implements Serializable {

    private List<Continent> continents = new ArrayList<>();
    private List<TerritoryDTO> territories = new ArrayList<>();

    public GameMapDTO(){}

    public TerritoryDTO getTerritory(String id){
        TerritoryDTO targetTerritory = null;

        for (TerritoryDTO territory: territories) {
            if(territory.getId().equals(id)){
                targetTerritory = territory;
                break;
            }
        }

        return targetTerritory;
    }
}
