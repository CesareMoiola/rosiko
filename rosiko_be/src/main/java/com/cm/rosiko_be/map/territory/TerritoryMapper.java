package com.cm.rosiko_be.map.territory;

public class TerritoryMapper {

    public static TerritoryDTO toTerritoryDTO(Territory territory){

        if(territory == null) return null;

        TerritoryDTO territoryDTO = new TerritoryDTO();

        territoryDTO.setId(territory.getId());
        territoryDTO.setName(territory.getName());
        territoryDTO.setContinentId(territory.getContinentId());
        territoryDTO.setCardType(territory.getCardType());
        territoryDTO.setNeighbouringTerritoriesId(territory.getNeighbouringTerritoriesId());
        territoryDTO.setOwnerId(territory.getOwner().getId());
        territoryDTO.setColor(territory.getColor());
        territoryDTO.setPlacedArmies(territory.getPlacedArmies());
        territoryDTO.setSelectable(territory.isSelectable());

        return territoryDTO;
    }
}
