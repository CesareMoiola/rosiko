package com.cm.rosiko_be.controller;

import com.cm.rosiko_be.data.Match;
import com.cm.rosiko_be.data.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@org.springframework.web.bind.annotation.RestController
public class MatchController {

    @Autowired
    MatchesManager matchesManager;
    int matchCounter = 0;


    @PutMapping("/update")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateMatch(@RequestBody Match match){
        matchesManager.updateMatch(match);
    }

    @GetMapping("/available_matches")
    public List<Match> getAvailableMatches(){
        return matchesManager.getAvailableMatches();
    }

    @GetMapping("/get_match")
    public Match getMatch(@RequestParam String matchId){
        return matchesManager.getMatch(Long.parseLong(matchId));
    }

    @GetMapping("/get_player")
    public Player getPlayer(@RequestBody Map<String, String> json){
        Match match = matchesManager.getMatch(Long.parseLong(json.get("matchId")));
        String playerId = json.get("playerId");
        Player targetPlayer = null;

        for (Player player : match.getPlayers()) {
            if(player.getId().equals(playerId)) {
                targetPlayer = player;
                break;
            }
        }
        return targetPlayer;
    }

    @GetMapping("/get_players")
    public List<Player> getPlayers(@RequestBody Map<String, String> json){
        Match match = matchesManager.getMatch(Long.parseLong(json.get("matchId")));
        return match.getPlayers();
    }
}
