package com.cm.rosiko_be.missions;

import com.cm.rosiko_be.data.Match;
import com.cm.rosiko_be.data.Player;

public abstract class Mission {

    public String description;

    public abstract boolean isMissionCompleted(Player player, Match match);

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
