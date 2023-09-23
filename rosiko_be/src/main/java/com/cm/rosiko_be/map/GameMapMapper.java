package com.cm.rosiko_be.map;

import com.cm.rosiko_be.map.territory.TerritoryMapper;

public class GameMapMapper {

    public static GameMapDTO toGameMapDTO(GameMap gameMap){
        GameMapDTO gameMapDTO = new GameMapDTO();
        gameMapDTO.setContinents(gameMap.getContinents());
        gameMapDTO.setTerritories(TerritoryMapper.toTerritoriesDTO(gameMap.getTerritories()));
        return gameMapDTO;
    }
}
