package com.cm.rosiko_be.map.territory;

import java.util.ArrayList;
import java.util.List;

public class TerritoryMapper {

    public static TerritoryDTO toTerritoryDTO(Territory territory){

        if(territory == null) return null;

        TerritoryDTO territoryDTO = new TerritoryDTO();

        territoryDTO.setId(territory.getId());
        territoryDTO.setName(territory.getName());
        territoryDTO.setContinentId(territory.getContinentId());
        territoryDTO.setCardType(territory.getCardType());
        territoryDTO.setNeighbouringTerritoriesId(territory.getNeighbouringTerritoriesId());
        if( territory.getOwner() != null){
            territoryDTO.setOwnerId(territory.getOwner().getId());
        }
        territoryDTO.setColor(territory.getColor());
        territoryDTO.setPlacedArmies(territory.getPlacedArmies());
        territoryDTO.setSelectable(territory.isSelectable());

        return territoryDTO;
    }

    public static List<TerritoryDTO> toTerritoriesDTO(List<Territory> territories){
        List<TerritoryDTO> territoriesDTO = new ArrayList<>();

        for (Territory territory: territories) {
            territoriesDTO.add(toTerritoryDTO(territory));
        }

        return territoriesDTO;
    }
}
