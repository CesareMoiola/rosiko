package com.cm.rosiko_be.match;

import com.cm.rosiko_be.data.Card;
import com.cm.rosiko_be.enums.Stage;
import com.cm.rosiko_be.map.GameMapDTO;
import com.cm.rosiko_be.map.territory.TerritoryDTO;
import com.cm.rosiko_be.player.PlayerDTO;
import lombok.Data;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class MatchDTO implements Serializable {
    private long id;
    private String name;
    private MatchState state;
    private String password;
    private List<PlayerDTO> players;
    private GameMapDTO map;
    private String playerOnDutyId;
    private int turn;
    private Stage stage = Stage.INITIAL_PLACEMENT;
    private Date date;                                  //Data di creazione della partita
    private TerritoryDTO attacker;                      //Territorio dell'attaccante
    private TerritoryDTO defender;                      //Territorio del difensore
    private String[] diceAttacker;                      //Risultato del lancio dei dadi dell'attaccante
    private String[] diceDefender;                      //Risultato del lancio dei dadi del difensore
    private TerritoryDTO territoryFrom;                 //Territorio dal quale spostare le armate
    private TerritoryDTO territoryTo;                   //Territorio dal quale ricevere le armate spostate
    private int moveArmies = 0;                         //Armate da spostare
    private boolean movementConfirmed = false;          //Conferma che il movimento è avvenuto
    private boolean armiesWereAssigned = false;         //Conferma che le armate sono state assegnate al giocatore di turno
    private PlayerDTO winner = null;
    private List<Card> cards = new ArrayList<>();
}
