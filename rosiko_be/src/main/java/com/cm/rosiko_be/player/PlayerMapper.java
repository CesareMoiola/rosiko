package com.cm.rosiko_be.player;

import com.cm.rosiko_be.mission.MissionMapper;

import java.util.ArrayList;
import java.util.List;

public class PlayerMapper {
    
    public static PlayerDTO toPlayerDTO(Player player){

        if(player == null) return null;

        PlayerDTO playerDTO = new PlayerDTO(player.getId(), player.getName());

        playerDTO.setColor(player.getColor());
        playerDTO.setAvailableArmies(player.getAvailableArmies());
        playerDTO.setMission(MissionMapper.toMissionDTO(player.getMission()));
        playerDTO.setArmiesPlacedThisTurn(player.getArmiesPlacedThisTurn());
        playerDTO.setActive(player.isActive());
        playerDTO.setDefeatedPlayersId(player.getDefeatedPlayersId());
        playerDTO.setMustDrawACard(player.isMustDrawACard());
        playerDTO.setCards(player.getCards());

        return playerDTO;
    }

    public static List<PlayerDTO> toPlayerDTO(List<Player> players){
        List<PlayerDTO> playersDTO = new ArrayList<>();

        for(Player player : players){
            playersDTO.add(toPlayerDTO(player));
        }

        return playersDTO;
    }
}
