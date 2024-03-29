package com.cm.rosiko_be.services;

import com.cm.rosiko_be.enums.Stage;
import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.match.MatchService;
import com.cm.rosiko_be.player.Player;
import com.cm.rosiko_be.socket.WSServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Timer;
import java.util.TimerTask;

@Service
public class TimerService {

    private Timer timer = null;
    private long delay = MatchService.MAX_INACTIVITY_PERIOD * 60000;

    @Autowired
    public WSServices wsServices;


    public void startTimer(MatchService matchController){
        Match match = matchController.getMatch();

        if(timer != null) timer.cancel();
        if(match.getStage().equals(Stage.GAME_OVER)) return;

        timer = new Timer();

        TimerTask task = new TimerTask() {
            public void run() {
                Match match = matchController.getMatch();
                Player player = match.getPlayerOnDuty();

                player.setActive(false);
                matchController.endsTurn();
                if(match.getWinner() == null) wsServices.sendsUpdatedMatchToPlayers(match.getId());
                stopTimer();
            }
        };

        timer.schedule(task,delay);
    }

    public void stopTimer(){if(timer != null) timer.cancel();}
}
