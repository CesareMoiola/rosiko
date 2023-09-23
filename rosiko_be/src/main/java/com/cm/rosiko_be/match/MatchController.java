package com.cm.rosiko_be.match;

import com.cm.rosiko_be.data.ArmiesToPlace;
import com.cm.rosiko_be.matches_manager.MatchesManager;
import com.cm.rosiko_be.player.Player;
import com.cm.rosiko_be.socket.WSServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        webSocketServices.sendsUpdatedMatchToPlayers(joinMatchDTO.matchId, joinMatchDTO.getUserId());
    }

    @PutMapping("/leaves")
    public void leavesMatch(@RequestBody LeaveMatchDTO leaveMatchDTO){

        matchesManager.leavesMatch(leaveMatchDTO.getUserId());

        webSocketServices.notifyJoinableMatches();
        webSocketServices.sendsUpdatedMatchToPlayers(leaveMatchDTO.getMatchId(), leaveMatchDTO.getUserId());
    }

    @GetMapping("/available")
    public ResponseEntity<List<MatchDTO>> getAvailableMatches(){
        List<MatchDTO> matches = matchesManager.getAvailableMatches();
        return ResponseEntity.ok( matches );
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

    @GetMapping("/get_players")
    public List<Player> getPlayers(@RequestBody Map<String, String> json){
        Match match = matchesManager.getMatch(Long.parseLong(json.get("matchId")));
        return match.getPlayers();
    }

    @PutMapping("/start/{id}")
    public void startMatch(@PathVariable("id") long id){
        Match match = matchesManager.getMatch(id);
        matchService.setMatch(match);
        matchService.startMatch();

        webSocketServices.sendsUpdatedMatchToPlayers(match.getId());
        webSocketServices.notifyJoinableMatches();
    }


    //Players match actions

    /**
     * Play a cards set
     * @param json matchId, card_1, card_2, card_3, playerId
     */
    @PostMapping("/play_cards")
    public void playCards(@RequestBody Map<String, String> json) {

        Integer[] cardsId = {
                Integer.parseInt(json.get("card_1")),
                Integer.parseInt(json.get("card_2")),
                Integer.parseInt(json.get("card_3"))
        };

        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.playCards(json.get("playerId"), cardsId);
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Place armies in the Initial placement or placement stage
     */
    @PostMapping("/place_armies")
    public ResponseEntity<String> placeArmies(@RequestBody ArmiesToPlace armiesToPlace) throws Exception {
        Match match = matchesManager.getMatch(armiesToPlace.getMatchId());

        matchService.setMatch(match);
        matchService.placeArmies(armiesToPlace.getArmies());
        webSocketServices.sendsUpdatedMatchToPlayers(match.getId());

        return ResponseEntity.ok("Armies placed");
    }

    /**
     * Select the territory from which to attack
     * @param json matchId, territoryId
     */
    @PutMapping("/select_attacker")
    public void selectAttacker(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectAttacker(json.get("territoryId"));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Select the territory from which to defend
     * @param json matchId, territoryId
     */
    @PutMapping("/select_defender")
    public void selectDefender(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectDefender(json.get("territoryId"));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Deselect the territory
     * @param json matchId, territoryId
     */
    @PutMapping("/deselect_territory")
    public void deselectTerritory(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.deselectTerritory(json.get("territoryId"));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    @PostMapping("/attack")
    public void attack(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.attack(Integer.parseInt(json.get("numberOfAttackerDice")));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Select territory from which to move armies
     * @param json matchId, territoryId
     */
    @PutMapping("/select_territory_from")
    public void selectTerritoryFrom(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectTerritoryFrom(json.get("territoryId"));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Select territory to which to move armies
     * @param json matchId, territoryId
     */
    @PutMapping("/select_territory_to")
    public void selectTerritoryTo(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.selectTerritoryTo(json.get("territoryId"));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Confirm armies movement
     * @param json matchId, territoryFrom, territoryTo, movedArmies
     */
    @PutMapping("/confirm_move")
    public void confirmMove(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.displaceArmies(json.get("territoryFrom"), json.get("territoryTo"), Integer.parseInt(json.get("movedArmies")), true);
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Change stage to displacement
     * @param json matchId
     */
    @PutMapping("/displacement_stage")
    public void displacementStage(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.displacementStage();
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Ends turn and save the armies movement
     * @param json matchId
     */
    @PostMapping("/ends_turn")
    public void endsTurn(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.endsTurn();
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }

    /**
     * Surrender the player
     * @param json matchId, playerId
     */
    @PostMapping("/surrender")
    public void surrender(@RequestBody Map<String, String> json) {
        matchService.setMatch(matchesManager.getMatch(Long.parseLong(json.get("matchId"))));
        matchService.surrender(json.get("playerId"));
        webSocketServices.sendsUpdatedMatchToPlayers(Long.parseLong(json.get("matchId")));
    }
}
