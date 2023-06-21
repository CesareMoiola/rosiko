package com.cm.rosiko_be.matches_manager;

import com.cm.rosiko_be.match.MatchState;
import com.cm.rosiko_be.enums.Stage;
import com.cm.rosiko_be.match.*;
import com.cm.rosiko_be.player.Player;
import com.cm.rosiko_be.player.PlayerDTO;
import com.cm.rosiko_be.player.PlayerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.concurrent.TimeUnit;
import static com.cm.rosiko_be.match.MatchState.READY;
import static com.cm.rosiko_be.match.MatchState.WAITING;
import static com.cm.rosiko_be.match.MatchService.MAX_PLAYERS;

@Component
@Slf4j
public class MatchesManager {

    static final int HOURS_BEFORE_REMOVE_MATCH = 1; //Ore da attendere prima di rimuovere il match da quando va in game over
    static final int MAX_MATCH_DURATION = 48;       //Massima durata di una partita in ore dopo la quale il match verrà rimosso

    private List<Match> openMatches = new ArrayList<>();

    @Autowired
    private PlayerService playerService;

    public List<Match> getAvailableMatches(){
        List<Match> availableMatches = new ArrayList<>();
        for(Match match : openMatches){
            if( (match.getState().equals(WAITING) || match.getState().equals(MatchState.READY))
                    && match.getPlayers().size() < MAX_PLAYERS
            ) availableMatches.add(match);
        }
        return availableMatches;
    }

    public void updateMatch(Match match){
        int index = openMatches.indexOf(getMatch(match.getId()));
        openMatches.set(index,match);
    }

    public Match getMatch(long id){
        Match match = null;

        for (Match currentMatch : openMatches) {
            if(currentMatch.getId() == id) {
                match = currentMatch;
                break;
            }
        }
        return match;
    }

    public MatchState getMatchState(long id){
        Match match = getMatch(id);
        MatchState state = null;

        if(match != null){
            state = match.getState();
        }

        return state;
    }

    public MatchDTO newMatch(NewMatchDTO newMatchDTO){

        Match match  = new Match(generateMatchId(), newMatchDTO.getName());
        match.setPassword(newMatchDTO.getPassword());

        openMatches.add(match);

        log.info("New match: " + match.getId());

        return MatchMapper.toMatchDTO(match);
    }

    public void joinMatch(JoinMatchDTO joinMatchDTO){

        if(joinMatchDTO == null) return;

        Match match = getMatch(joinMatchDTO.getMatchId());
        PlayerDTO playerDTO = joinMatchDTO.getPlayer();
        Player player = playerService.getPlayer(playerDTO.getId());

        player.setCurrentMatchID(match.getId());
        player.setName(playerDTO.getName());
        player.setActive(true);

        try {
            match.addNewPlayer(player);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void leavesMatch(LeaveMatchDTO leaveMatchDTO){

        Match match = getMatch(leaveMatchDTO.getMatchId());
        Player player = playerService.getPlayer(leaveMatchDTO.getPlayerId());

        player.setCurrentMatchID(null);
        player.setName(null);

        try{
            match.removePlayer(leaveMatchDTO.getPlayerId());
        }
        catch (Exception e){}

        removeInactiveMatches();
    }

    public long generateMatchId(){
        long id = 1;

        for (int i = 0; i< openMatches.size(); i++) {
            if(openMatches.get(i).getId() == id){
                id++;
                i=0;
            }
        }
        return id;
    }

    public void removeInactiveMatches(){
        Calendar cal = Calendar.getInstance();
        Date today = cal.getTime();
        int counter;
        List<Match> newMatchList = new ArrayList<>(openMatches);

        for (Match match : openMatches){
            long diffInMillies = Math.abs(today.getTime() - match.getDate().getTime());
            long diff = TimeUnit.HOURS.convert(diffInMillies, TimeUnit.MILLISECONDS);

            if( match.getPlayers().size() == 0 ) newMatchList.remove(match);

            if(match.getStage().equals(Stage.GAME_OVER)){
                if(diff >= HOURS_BEFORE_REMOVE_MATCH) newMatchList.remove(match);
            }
            else{
                if(diff >= MAX_MATCH_DURATION) newMatchList.remove(match);
            }
        }

        counter = openMatches.size() - newMatchList.size();
        openMatches = newMatchList;

        if(counter > 0){
            System.out.println("Matches removed: " + counter + ", matches active: " + openMatches.size());
        }
    }

    /**
     * @// TODO: 21/05/2023 It's not the correct spot
     */
    public void removePlayerFromWaitingRoom(long matchId, String playerId){
        Match match = getMatch(matchId);
        if(match.getState().equals(WAITING) || match.getState().equals(READY)){
            match.removePlayer(playerId);
        }
    }
}
