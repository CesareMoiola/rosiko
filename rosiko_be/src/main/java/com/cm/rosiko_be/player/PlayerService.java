package com.cm.rosiko_be.player;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class PlayerService {

    List<Player> players = new ArrayList<>();

    public Player getNewPlayer(){
        String playerId = getNewId();
        return getNewPlayer(playerId);
    }

    public Player getNewPlayer(String id){
        Player player = new Player(id);
        players.add(player);
        log.info("New player: " + player.getId());
        return player;
    }

    public Player getPlayer(String playerId){
        Player player = null;

        for (Player currentPlayer : players){
            if(currentPlayer.getId() != null && currentPlayer.getId().equals(playerId)){
                player = currentPlayer;
                break;
            }
        }

        if(player == null){
            player = getNewPlayer(playerId);
        }

        return player;
    }

    public void updatePlayer(PlayerDTO playerDTO){
        Player player = getPlayer(playerDTO.getId());
        player.setSocketID(playerDTO.getSocketID());
        player.setName(playerDTO.getName());
    }

    public void updateSocket(String id, String socketId){
        log.info("Player " + id + " update socket: " + socketId);
        Player player = getPlayer(id);
        player.setSocketID(socketId);
    }

    private String getNewId(){
        String playerId;

        do {
            playerId = UUID.randomUUID().toString();

            for (Player currentPlayer : players) {
                if (currentPlayer.getId() != null && currentPlayer.getId().equals(playerId)) {
                    playerId = null;
                    break;
                }
            }
        }
        while (playerId == null);

        return playerId;
    }
}
