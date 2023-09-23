package com.cm.rosiko_be.player;

import com.cm.rosiko_be.data.Card;
import com.cm.rosiko_be.enums.Color;
import com.cm.rosiko_be.mission.MissionDTO;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class PlayerDTO implements Serializable {
    private String id;
    private String name ;
    private Color color = null;
    private int availableArmies = 0;
    private MissionDTO mission;
    private int armiesPlacedThisTurn = 0;
    private boolean isActive = true;
    private List<String> defeatedPlayersId = new ArrayList<>();
    private boolean mustDrawACard = false;
    private List<Card> cards = new ArrayList<>();

    public PlayerDTO(String id, String name){
        this.id = id;
        this.name = name;
    }
}
