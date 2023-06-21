package com.cm.rosiko_be.match;

import com.cm.rosiko_be.matches_manager.MatchesManager;
import com.cm.rosiko_be.player.Player;
import com.cm.rosiko_be.socket.WSServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/match")
@CrossOrigin(origins = "*")
public class MatchController {

    @Autowired
    MatchesManager matchesManager;

    @Autowired
    MatchService matchService;

    @Autowired
    WSServices webSocketServices;


    @PostMapping("/new")
    public ResponseEntity<MatchDTO> newMatch(@RequestBody NewMatchDTO newMatchDTO){
        matchesManager.removeInactiveMatches();

        MatchDTO match = matchesManager.newMatch(newMatchDTO);

        webSocketServices.notifyJoinableMatches();

        return ResponseEntity.ok(match);
    }

    @PutMapping("/join")
    public void joinMatch(@RequestBody JoinMatchDTO joinMatchDTO){

        matchesManager.joinMatch(joinMatchDTO);

        webSocketServices.notifyJoinableMatches();
        webSocketServices.sendsUpdatedMatchToPlayers(joinMatchDTO.matchId, joinMatchDTO.getPlayer().getId());
    }

    @PutMapping("/leaves")
    public void leavesMatch(@RequestBody LeaveMatchDTO leaveMatchDTO){

        matchesManager.leavesMatch(leaveMatchDTO);

        webSocketServices.notifyJoinableMatches();
        webSocketServices.sendsUpdatedMatchToPlayers(leaveMatchDTO.getMatchId(), leaveMatchDTO.getPlayerId());
    }

    @GetMapping("/available")
    public ResponseEntity<List<MatchDTO>> getAvailableMatches(){
        List<Match> matches = matchesManager.getAvailableMatches();
        return ResponseEntity.ok( MatchMapper.toMatchesDTO(matches) );
    }

    @PutMapping("/update")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateMatch(@RequestBody Match match){
        matchesManager.updateMatch(match);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDTO> getMatch(@PathVariable("id") long id){
        MatchDTO matchDTO = MatchMapper.toMatchDTO(matchesManager.getMatch(id));
        return ResponseEntity.ok(matchDTO);
    }

    @GetMapping("/state/{id}")
    public ResponseEntity<MatchState> getMatchState(@PathVariable("id") long id){
        MatchState state = matchesManager.getMatchState(id);
        return ResponseEntity.ok(state);
    }

    @GetMapping("/get_player")
    public Player getPlayer(@RequestBody Map<String, String> json){
        Match match = matchesManager.getMatch(Long.parseLong(json.get("matchId")));
        String playerId = json.get("playerId");
        Player targetPlayer = null;

        for (Player player : match.getPlayers()) {
            if(player.getSocketID().equals(playerId)) {
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

    @PutMapping("/start/{id}")
    public void startMatch(@PathVariable("id") long id){
        Match match = matchesManager.getMatch(id);
        matchService.setMatch(match);
        matchService.start();

        webSocketServices.sendsUpdatedMatchToPlayers(match.getId());
        webSocketServices.notifyJoinableMatches();
    }
}
