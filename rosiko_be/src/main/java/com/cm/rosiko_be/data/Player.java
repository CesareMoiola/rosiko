package com.cm.rosiko_be.data;

import com.cm.rosiko_be.missions.Mission;
import com.cm.rosiko_be.enums.Color;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Player {
    private String id;
    private String name ;
    private Color color = null;
    private int availableArmies = 0;                //Armate che ha a disposizione il giocatore per essere posizionate sui territori
    private Mission mission;                        //Obiettivo da raggiungere per vincere la partita
    private int armiesPlacedThisTurn = 0;           //Armate che il giocatore ha piazzato durante il turno
    private boolean isActive = true;
    private List<Player> defeatedPlayers = new ArrayList<>();
    private boolean mustDrawACard = false;          //Se a fine turno il giocatore deve pescare una carta
    private List<Card> cards = new ArrayList<>();   //Lista di carte a disposizione del giocatore


    public Player(String id, String name){
        this.id = id;
        this.name = name;
    }


    public void increaseArmiesPlacedThisTurn(int increase) {
        this.armiesPlacedThisTurn += increase;
    }

    public void addDefeatedPlayer(Player player){
        defeatedPlayers.add(player);
    }

    public void addCard(Card card) {
        this.cards.add(card);
    }

    public void addCards(List<Card> cards) {
        for(Card card : cards){
            this.cards.add(card);
        }
    }

    public void removeCard(Card card) {this.cards.remove(card);};

    public boolean hasCard(Card card) {
        boolean hasCard = false;
        for (Card currentCard : this.cards){
            if(currentCard.getId() == card.getId()){
                hasCard = true; break;
            }
        }
        return hasCard;
    }

    public Card getCard(int cardId){
        Card target = null;
        for(Card card : cards){
            if(card.getId() == cardId) {
                target = card; break;
            }
        }
        return target;
    }

    public List<Card> takeCards(){
        List<Card> cards = this.cards;
        this.cards = new ArrayList<>();
        return cards;
    }
}
