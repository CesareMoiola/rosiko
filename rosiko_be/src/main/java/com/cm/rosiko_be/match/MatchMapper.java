package com.cm.rosiko_be.match;

import com.cm.rosiko_be.map.territory.TerritoryMapper;
import com.cm.rosiko_be.player.PlayerMapper;
import java.util.ArrayList;
import java.util.List;

public class MatchMapper {

    public static MatchDTO toMatchDTO(Match match){

        if(match == null) return null;

        MatchDTO matchDTO = new MatchDTO();

        matchDTO.setId(match.getId());
        matchDTO.setName(match.getName());
        matchDTO.setState(match.getState());
        matchDTO.setPassword(match.getPassword());
        matchDTO.setPlayers(PlayerMapper.toPlayerDTO(match.getPlayers()));
        matchDTO.setMap(match.getMap());

        if(match.getPlayerOnDuty() != null){
            matchDTO.setPlayerOnDutyId(match.getPlayerOnDuty().getId());
        }

        matchDTO.setTurn(match.getTurn());
        matchDTO.setStage(match.getStage());
        matchDTO.setDate(match.getDate());
        matchDTO.setAttacker(TerritoryMapper.toTerritoryDTO(match.getAttacker()));
        matchDTO.setDefender(TerritoryMapper.toTerritoryDTO(match.getDefender()));
        matchDTO.setDiceAttacker(match.getDiceAttacker());
        matchDTO.setDiceDefender(match.getDiceDefender());
        matchDTO.setTerritoryFrom(TerritoryMapper.toTerritoryDTO(match.getTerritoryFrom()));
        matchDTO.setTerritoryTo(TerritoryMapper.toTerritoryDTO(match.getTerritoryTo()));
        matchDTO.setMoveArmies(match.getMoveArmies());
        matchDTO.setMovementConfirmed(match.isMovementConfirmed());
        matchDTO.setArmiesWereAssigned(match.areArmiesAssignedToPlayer());
        matchDTO.setWinner(PlayerMapper.toPlayerDTO(match.getWinner()));
        matchDTO.setCards(match.getCards());

        return matchDTO;
    }

    public static List<MatchDTO> toMatchesDTO(List<Match> matches){
        List<MatchDTO> matchesDTO = new ArrayList<>();

        for(Match match : matches){
            matchesDTO.add(toMatchDTO(match));
        }

        return matchesDTO;
    }
}
