package com.cm.rosiko_be.data;

import com.cm.rosiko_be.enums.CardType;
import lombok.Data;

@Data
public class Card {
    private int id;
    private String territoryId;
    private String territoryName;
    private CardType cardType;
    private boolean selected;

    public Card(int id, Territory territory, CardType cardType) {
        this.id = id;
        this.territoryId = territory.getId();
        this.territoryName = territory.getName();
        this.cardType = cardType;
    }

    public Card(int id, CardType cardType) {
        this.id = id;
        this.cardType = cardType;
    }
}
