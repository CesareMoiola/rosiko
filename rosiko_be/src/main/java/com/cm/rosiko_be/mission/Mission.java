package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.match.Match;
import com.cm.rosiko_be.player.Player;
import lombok.Data;

@Data
public abstract class Mission{

    protected long id;
    protected String description;


    public Mission(long id){
        this.id = id;
        this.description = description;
    }


    public abstract boolean isMissionCompleted(Player player, Match match);

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
