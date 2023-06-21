package com.cm.rosiko_be.socket;

import com.cm.rosiko_be.match.MatchDTO;
import com.cm.rosiko_be.match.MatchMapper;
import com.cm.rosiko_be.matches_manager.MatchesManager;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/*Questa classe serve per mandare messaggi tramite web socket a i client iscritti*/
@Slf4j
@Service
public class WSServices {

    @Autowired
    public SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MatchesManager matchesManager;

    /**
     * Send available matches to subscribers at /queue/joinableMatches
     */
    public void notifyJoinableMatches (){
        messagingTemplate.convertAndSend("/queue/joinableMatches", matchesManager.getAvailableMatches());
    }

    /**
     * Send the updated match to subscribers at /queue/match excluding a specific player
     */
    public void sendsUpdatedMatchToPlayers(long matchId, String excludedPlayerId){
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }

        Match match = matchesManager.getMatch(matchId);

        if(match == null) return;

        for(Player player : match.getPlayers()){
            if(!player.getId().equals(excludedPlayerId) && player.getSocketID() != null){
                messagingTemplate.convertAndSendToUser(player.getSocketID(),"/queue/match", match);
            }
        }
    }

    /**
     * Send the updated match to subscribers at /queue/match
     */
    public void sendsUpdatedMatchToPlayers(long matchId){
        Match match = matchesManager.getMatch(matchId);
        MatchDTO matchDTO = MatchMapper.toMatchDTO(match);

        for(Player player : match.getPlayers()){
            messagingTemplate.convertAndSendToUser(player.getSocketID(),"/queue/match", matchDTO);
        }
    }
}
