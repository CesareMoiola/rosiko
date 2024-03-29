package com.cm.rosiko_be.match;

import com.cm.rosiko_be.data.Card;
import com.cm.rosiko_be.enums.Color;
import com.cm.rosiko_be.enums.Stage;
import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.map.GameMap;
import com.cm.rosiko_be.map.territory.Territory;
import com.cm.rosiko_be.player.Player;
import com.cm.rosiko_be.services.TimerService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Match {
    private long id;
    private String name;
    private MatchState state = MatchState.WAITING;
    private String password;
    private List<Player> players = new ArrayList<>();
    private GameMap map = new GameMap();
    private Player playerOnDuty;
    private int turn = 0;
    private Stage stage = Stage.INITIAL_PLACEMENT;
    private Date date;                              //Data di creazione della partita
    private Territory attacker;                     //Territorio dell'attaccante
    private Territory defender;                     //Territorio del difensore
    private String[] diceAttacker;                  //Risultato del lancio dei dadi dell'attaccante
    private String[] diceDefender;                  //Risultato del lancio dei dadi del difensore
    private Territory territoryFrom;                //Territorio dal quale spostare le armate
    private Territory territoryTo;                  //Territorio dal quale ricevere le armate spostate
    private int moveArmies = 0;                     //Armate da spostare
    private boolean movementConfirmed = false;      //Conferma che il movimento è avvenuto
    private boolean armiesWereAssigned = false;     //Conferma che le armate sono state assegnate al giocatore di turno
    private Player winner = null;
    private List<Card> cards = new ArrayList<>();

    @JsonIgnore
    private TimerService timerService = new TimerService();

    public Match(long id, String name) {
        this.id = id;
        this.name = name;
        this.date = Calendar.getInstance().getTime();
    }


    public void addNewPlayer(Player player) throws Exception {
        if (players.size() >= MatchService.MAX_PLAYERS) {
            throw new Exception("Cannot add new player because max players are " + MatchService.MAX_PLAYERS);
        }

        //Inizializza la lista colorsTaken con tutti i colori utilizzati dagli altri giocatori
        List<Color> colorsTaken = new ArrayList<>();
        for (Player currentPlayer : players) {
            colorsTaken.add(currentPlayer.getColor());
        }

        player.setColor(Color.getRandomColor(colorsTaken));

        players.add(player);

        if (players.size() >= MatchService.MIN_PLAYERS && this.state == MatchState.WAITING)
            this.state = MatchState.READY;
    }

    public long getId() {
        return id;
    }

    public MatchState getState() {
        return state;
    }

    public void setState(MatchState state) {
        this.state = state;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public void removePlayer(String playerId){
        Player targetPlayer = null;

        for (Player player : players) {
            if(player.getId().equals(playerId)){
                targetPlayer = player;
                break;
            }
        }

        players.remove(targetPlayer);
    }

    public GameMap getMap() {
        return map;
    }

    public void setMap(GameMap map) {
        this.map = map;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public Date getDate() {
        return date;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Player getPlayerOnDuty() {
        return playerOnDuty;
    }

    public void setPlayerOnDuty(Player playerOnDuty) {
        this.playerOnDuty = playerOnDuty;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getTurn() {
        return turn;
    }

    public void setTurn(int turn) {
        this.turn = turn;
    }

    public Territory getAttacker() {
        return attacker;
    }

    public void setAttacker(Territory attacker) {
        this.attacker = attacker;
        this.diceAttacker = null;
        this.diceDefender = null;
    }

    public Territory getDefender() {
        return defender;
    }

    public void setDefender(Territory defender) {
        this.defender = defender;
        this.diceAttacker = null;
        this.diceDefender = null;
    }

    public String[] getDiceAttacker() {
        return diceAttacker;
    }

    public void setDiceAttacker(String[] diceAttacker) {
        this.diceAttacker = diceAttacker;
    }

    public String[] getDiceDefender() {
        return diceDefender;
    }

    public void setDiceDefender(String[] diceDefender) {
        this.diceDefender = diceDefender;
    }

    public int getMoveArmies() {
        return moveArmies;
    }

    public void setMoveArmies(int moveArmies) {
        this.moveArmies = moveArmies;
    }

    public Territory getTerritoryFrom() {
        return territoryFrom;
    }

    public void setTerritoryFrom(Territory territoryFrom) {
        this.territoryFrom = territoryFrom;
    }

    public Territory getTerritoryTo() {
        return territoryTo;
    }

    public void setTerritoryTo(Territory territoryTo) {
        this.territoryTo = territoryTo;
    }

    public boolean isMovementConfirmed() {
        return movementConfirmed;
    }

    public void setMovementConfirmed(boolean movementConfirmed) {
        this.movementConfirmed = movementConfirmed;
    }

    public boolean areArmiesAssignedToPlayer() {
        return armiesWereAssigned;
    }

    public void setArmiesWereAssigned(boolean armiesWereAssigned) {
        this.armiesWereAssigned = armiesWereAssigned;
    }

    public Player getWinner() {
        return winner;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public Card getCard(int id) {
        Card card = null;

        for (Card currentCard : cards) {
            if (currentCard.getId() == id) card = currentCard;
        }
        return card;
    }

    public TimerService getTimerService() {
        return timerService;
    }

    public void setTimerService(TimerService timerService) {
        this.timerService = timerService;
    }


    //Ritorna tutti i continenti posseduti interamente dal player
    public List<Continent> getContinentsOwned(Player player) {
        List<Continent> continentsOwned = new ArrayList<>();

        for (Continent continent : map.getContinents()) {
            boolean isContinentOwned = true;
            for (Territory territory : map.getTerritories()) {
                //Il proprietario del territorio è diverso dal giocatore
                if (territory.getContinentId().equals(continent.getId())
                        && !territory.getOwner().equals(player)
                ) {
                    isContinentOwned = false;
                    break;
                }
            }
            if (isContinentOwned) continentsOwned.add(continent);
        }

        return continentsOwned;
    }

    //Ritorna tutti i territori posseduti dal player
    public List<Territory> getTerritoriesOwned(Player player) {
        List<Territory> territoriesOwned = new ArrayList<>();

        for (Territory territory : map.getTerritories()) {
            if (territory.getOwner().equals(player)) {
                territoriesOwned.add(territory);
            }
        }

        return territoriesOwned;
    }

    //Ritorna la lista di giocatori attivi
    public List<Player> getActivePlayers(){
        List<Player> activePlayers = new ArrayList<>();
        List<Player> players = this.players;

        for(Player player : players){
            if(player.isActive()) activePlayers.add(player);
        }

        return activePlayers;
    }
}
