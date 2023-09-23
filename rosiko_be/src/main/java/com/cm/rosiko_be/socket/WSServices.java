package com.cm.rosiko_be.socket;

import com.cm.rosiko_be.User.User;
import com.cm.rosiko_be.User.UserService;
import com.cm.rosiko_be.match.MatchDTO;
import com.cm.rosiko_be.match.MatchMapper;
import com.cm.rosiko_be.matches_manager.MatchesManager;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessagingException;
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

    @Autowired
    public UserService userService;

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

        MatchDTO matchDTO = MatchMapper.toMatchDTO(match);

        for(Player player : match.getPlayers()){

            User user = userService.getUser(player.getId());

            if(!player.getId().equals(excludedPlayerId) && user.getSocketId() != null){
                log.info("Socket match update to user: " + user.getSocketId());
                try {
                    messagingTemplate.convertAndSendToUser(user.getSocketId(),"/queue/match", matchDTO);
                }
                catch (MessagingException e) {
                    log.error(e.toString());
                }
            }
        }
    }

    /**
     * Send the updated match to subscribers at /queue/match
     */
    public void sendsUpdatedMatchToPlayers(long matchId){
        Match match = matchesManager.getMatch(matchId);
        MatchDTO matchDTO = MatchMapper.toMatchDTO(match);

        for(Player player : match.getPlayers()) {

            User user = userService.getUser(player.getId());
            if(user == null || user.getSocketId() == null){
                log.error("User " + player.getId() + " not found");
            }
            else{
                log.info("Socket match update to user: " + user.getSocketId());
                try{
                    messagingTemplate.convertAndSendToUser(user.getSocketId(), "/queue/match", matchDTO);
                }
                catch (MessagingException e) {
                    log.error(e.toString());
                }
            }
        }

        log.info("Match updated for all players");
    }
}
