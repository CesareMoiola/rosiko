package com.cm.rosiko_be.controller;

import com.cm.rosiko_be.data.ArmiesToPlace;
import com.cm.rosiko_be.data.Match;
import com.cm.rosiko_be.services.MatchService;
import com.cm.rosiko_be.services.WSServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import java.security.Principal;
import java.util.Map;


/*Questa classe si occupa di recepire i messaggi arrivati tramite websocket e rispondere*/
@Controller
public class SocketController {

    private final int RESPONSE_DELAY = 0; //Secondi di attesa prima di inviare la risposta

    @Autowired
    public MatchService matchService;

    @Autowired
    public MatchesManager matchesManager;

    @Autowired
    public WSServices wsService;

    /*Manda il match aggiornato ai player partecipanti*/
    @MessageMapping("/match")
    public void getMatch(@Payload Map<String, String> json) {
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Crea un nuovo match in stato waiting con iscritto il player che ha creato la partita.
     * Il match viene aggiunto alla lista matchList e notifica gli utenti dell'aggiornamento*/
    @MessageMapping("/new_match")
    @SendToUser("/queue/new_match")
    public Match newMatch(Map<String, String> json, Principal principal) throws InterruptedException{
        Match match = matchesManager.newMatch(json.get("matchName"), json.get("password"));
        try {
            match.addNewPlayer(json.get("playerName"), principal.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        wsService.notifyJoinableMatches();
        return match;
    }

    @MessageMapping("/join_match")
    public void joinMatch(@RequestBody Map<String, String> json, Principal principal){
        Match match = matchesManager.getMatch(Long.parseLong(json.get("matchId")));
        try {
            match.addNewPlayer(json.get("playerName"), principal.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        wsService.notifyMatch(match.getId(), principal.getName());
        wsService.notifyJoinableMatches();
    }

    //Viene dato il via alla partita
    @MessageMapping("/start_match")
    public void startMatch(@RequestBody Map<String, String> json){
        Match match = matchesManager.getMatch(Long.parseLong(json.get("matchId")));
        matchService.setMatch(match);
        matchService.start();

        wsService.notifyMatch(match.getId());
        wsService.notifyJoinableMatches();
    }

    /*Piazza un armata*/
    @MessageMapping("/place_armies")
    public void placeArmies(@Payload ArmiesToPlace armiesToPlace) {
        Match match = matchesManager.getMatch(armiesToPlace.getMatchId());
        matchService.setMatch(match);

        matchService.placeArmies(armiesToPlace.getArmies());

        wsService.notifyMatch(match.getId());
    }

    /*Seleziona il territorio dal quale attaccare*/
    @MessageMapping("/select_attacker")
    public void selectAttacker(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectAttacker(json.get("territoryId"));
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Seleziona il territorio da attaccare*/
    @MessageMapping("/select_defender")
    public void selectDefender(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectDefender(json.get("territoryId"));
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Deseleziona il territorio*/
    @MessageMapping("/deselect_territory")
    public void deselectTerritory(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.deselectTerritory(json.get("territoryId"));
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Attack*/
    @MessageMapping("/attack")
    public void attack(@Payload Map<String, String> json) {
        int numberOfAttackerDice = 0;
        try{numberOfAttackerDice = Integer.parseInt(json.get("numberOfAttackerDice"));}
        catch (NumberFormatException e){
            e.printStackTrace();
        }

        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.attack(numberOfAttackerDice);

        try {
            Thread.sleep(RESPONSE_DELAY * 1000);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }

        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Change stage to displacement*/
    @MessageMapping("/displacement_stage")
    public void displacementStage(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.displacementStage();
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Select territory from which to move armies*/
    @MessageMapping("/select_territory_from")
    public void selectTerritoryFrom(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectTerritoryFrom(json.get("territoryId"));
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Select territory to which to move armies*/
    @MessageMapping("/select_territory_to")
    public void selectTerritoryTo(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectTerritoryTo(json.get("territoryId"));
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Ends turn and save the armies movement*/
    @MessageMapping("/ends_turn")
    public void endsTurn(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.endTurn();
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Confirm armies movement*/
    @MessageMapping("/confirm_move")
    public void confirmMove(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.displacementFase(json.get("territoryFrom"), json.get("territoryTo"), Integer.parseInt(json.get("movedArmies")), false);
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Play a cards set*/
    @MessageMapping("/play_cards")
    public void playCards(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        Integer[] cardsId = {
                Integer.parseInt(json.get("card_1")),
                Integer.parseInt(json.get("card_2")),
                Integer.parseInt(json.get("card_3"))
        };
        String playerId = json.get("playerId");

        matchService.playCards(playerId, cardsId);
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Surrender the player*/
    @MessageMapping("/surrender")
    public void surrender(@Payload Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        String playerId = json.get("playerId");

        matchService.surrender(playerId);
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
    }

    /*Leavs match*/
    @MessageMapping("/leaves_match")
    public void leavesMatch(@Payload Map<String, String> json) {
        long matchId = Long.parseLong(json.get("matchId"));
        String playerId = json.get("playerId");

        matchesManager.leavesMatch(matchId, playerId);
        wsService.notifyMatch(Long.parseLong(json.get("matchId")));
        wsService.notifyJoinableMatches();
    }
}
