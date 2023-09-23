package com.cm.rosiko_be.match;

import com.cm.rosiko_be.data.Card;
import com.cm.rosiko_be.enums.CardType;
import com.cm.rosiko_be.enums.Stage;
import com.cm.rosiko_be.map.continent.Continent;
import com.cm.rosiko_be.map.GameMap;
import com.cm.rosiko_be.map.territory.Territory;
import com.cm.rosiko_be.mission.Mission;
import com.cm.rosiko_be.mission.MissionsService;
import com.cm.rosiko_be.player.Player;
import com.cm.rosiko_be.services.TimerService;
import com.cm.rosiko_be.socket.WSServices;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import static com.cm.rosiko_be.enums.CardType.*;
import static com.cm.rosiko_be.enums.Stage.*;

@Slf4j
@Data
@Service
public class MatchService {

    public static final int MAX_PLAYERS = 6;
    public static final int MIN_PLAYERS = 3;
    public static final int INITIAL_ARMIES_TO_PLACE = 3;    //Numero di armate che si possono piazzare nella fase INITIAL_PLACEMENT
    public static final int TERRITORIES_FOR_AN_ARMY = 3;    //Numero di territori in possesso per avere una armata.
    public static final int MINIMUM_ATTACKING_ARMIES = 2;   //Numero minimo di armate che un territorio deve avere per potere attaccare.
    public static final int MAX_ATTACKING_DICES = 3;        //Numero massimo di dadi concessi all'attaccante.
    public static final int MAX_DICE_VALUE = 6;             //Massimo valore che può assumere un dado.
    public static final int MIN_DICE_VALUE = 1;             //Minimo valore che può assumere un dado.
    public static final int MIN_ARMIES_FOR_TERRITORY = 1;   //Numero minimo di armate possibili per un territorio.
    public static final int TRACTOR_SET_BONUS = 4;          //Bonus di armate nel caso di un tris di trattori
    public static final int FARMER_SET_BONUS = 6;           //Bonus di armate nel caso di un tris di contadini
    public static final int COW_SET_BONUS = 8;              //Bonus di armate nel caso di un tris di mucche
    public static final int DIFFERENT_CARDS_SET_BONUS = 10; //Bonus di armate nel caso di un tris di mucca, contadino e trattore
    public static final int JOLLY_SET_BONUS = 12;           //Bonus di armate nel caso di un tris di un jolly + 2 carte uguali
    public static final int SET_CARDS_NUMBER = 3;           //Numero di carte per fare un tris
    public static final int CARD_TERRITORY_BONUS = 2;       //Numero armate bonus se si possiede il territorio della carta giocata
    public static final int MINIMUM_AVAIABLE_ARMIES = 1;    //Numero armate bonus se si possiede il territorio della carta giocata
    public static final int MAX_INACTIVITY_PERIOD = 100;    //Minuti di inattività consentiti per ogni giocatore
    public static final int NUMBER_OF_JOLLY_IN_THE_DECK = 2;
    public static final int DICE_ROLLING_DELAY = 1000;

    @Autowired
    public WSServices wsServices;

    @Autowired
    public TimerService timerService;

    @Autowired
    public MissionsService missionsService;

    Match match;


    public MatchService(){}



    public void startMatch(){
        if(!areThereEnoughPlayers()) {
            log.error("Match started without enough players");
            return;
        }

        match.setState(MatchState.STARTED);

        initialMatchPreparation();

        prepareStage();
    }

    public void placeArmies(Map<String, Integer> armiesToPlace) throws Exception {

        if( !checkArmiesToPlace(armiesToPlace) ) throw new Exception("It is not possible to place these armies");

        for (Map.Entry<String, Integer> entry : armiesToPlace.entrySet()) {
            Territory territory = match.getMap().getTerritory(entry.getKey());
            placeArmies(territory, entry.getValue());
        }

        nextStage();
    }

    public void attack(int numberOfAttackerDice){

        diceRollingDelay();

        if(match.getAttacker() == null || match.getDefender() == null) {
            match.setDiceAttacker(null);
            match.setDiceDefender(null);
            return;
        }

        List<Integer> dicesAttackerList = getDicesAttacker(numberOfAttackerDice);
        List<Integer> dicesDefenderList = getDicesDefender();
        int armiesLostByAttacker = 0;
        int armiesLostByDefender = 0;
        String[] diceAttackerResult = new String[MAX_ATTACKING_DICES];
        String[] diceDefenderResult = new String[MAX_ATTACKING_DICES];


        //Rolling of the dice
        diceRoll(dicesAttackerList);
        diceRoll(dicesDefenderList);

        //Calculation of armies lost by the attacker and defender
        for(int i=0; i<Integer.min(dicesAttackerList.size(), dicesDefenderList.size()); i++){
            if( dicesAttackerList.get(i) > dicesDefenderList.get(i) ){
                armiesLostByDefender++;
            }
            else{
                armiesLostByAttacker++;
            }
        }

        //Default values
        for(int i=0; i<MAX_ATTACKING_DICES; i++){
            diceAttackerResult[i] = "none";
            diceDefenderResult[i] = "none";
        }

        //Actual values
        for(int i=0; i< dicesAttackerList.size(); i++){
            diceAttackerResult[i] = dicesAttackerList.get(i).toString();
        }

        //Actual values
        for(int i=0; i< dicesDefenderList.size(); i++){
            diceDefenderResult[i] = dicesDefenderList.get(i).toString();
        }

        match.setDiceAttacker(diceAttackerResult);
        match.setDiceDefender(diceDefenderResult);

        //Decrease in defeated armies
        match.getAttacker().removeArmies(armiesLostByAttacker);
        match.getDefender().removeArmies(armiesLostByDefender);

        //Case of conquest
        conquest(dicesAttackerList.size());

        nextStage();
    }


    private void initialMatchPreparation(){
        setTheOrderOfPlayers();

        assignsArmiesToPlayers();

        assignMissionsToPlayers();

        distributionOfTerritoriesToPlayers();

        setDeckOfCards();

        match.setStage(INITIAL_PLACEMENT);

        placeMinimumArmiesOnEachTerritory();
    }

    private void setFirstStageOfTheTurn(){

        int turn = match.getTurn();
        Stage firstStage;

        if(turn > 0){
            if(isTheFirstTurnOfThePlayer(match.getPlayerOnDuty())){
                firstStage = ATTACK;
            }
            else{
                firstStage = PLACEMENT;
            }
        }
        else{
            firstStage = INITIAL_PLACEMENT;
        }

        match.setStage(firstStage);
    }

    private void prepareStage(){
        timerService.stopTimer();

        calculateWinner();

        switch(match.getStage()) {
            case INITIAL_PLACEMENT: break;
            case PLACEMENT: assignArmiesToThePlayer(); break;
            case ATTACK: prepareAttackStage(); break;
            case DISPLACEMENT: prepareDisplacementStage(); break;
            case GAME_OVER: prepareGameOverStage(); break;
        }

        setSelectableTerritories();

        timerService.startTimer(this);
    }

    private void nextStage(){
        Stage matchStage = match.getStage();
        Stage nextStage = null;

        switch (matchStage){
            case INITIAL_PLACEMENT: nextTurn(); break;
            case PLACEMENT: nextStage=ATTACK; break;
            case ATTACK: nextStage=ATTACK; break;
            case DISPLACEMENT: nextTurn(); break;
            case GAME_OVER: break;
            default: break;
        }

        if(nextStage!=null){
            match.setStage(nextStage);
        }

        prepareStage();
    }

    private void nextTurn(){

        Stage stage = match.getStage();
        int turn = match.getTurn();

        if(!stage.equals(INITIAL_PLACEMENT) || isInitialPlacementOver()){
            turn++;
            match.setTurn(turn);
        }

        setPlayerOnDuty();

        resetPlayerActions(match.getPlayerOnDuty());

        setFirstStageOfTheTurn();

        prepareStage();
    }

    private void setPlayerOnDuty(){

        Player newPlayerOnDuty;

        if(match.getStage().equals(INITIAL_PLACEMENT)){
            newPlayerOnDuty = nextPlayerWithAvailableArmies();

            if(newPlayerOnDuty == null){
                newPlayerOnDuty = match.getActivePlayers().get(0);
            }
        }
        else {
            newPlayerOnDuty = getNextPlayer();
        }

        match.setPlayerOnDuty(newPlayerOnDuty);
    }


    //--------------------------OLD------------------------------------------------

    private void resetPlayerActions(Player player){
        if(player != null) {
            player.setArmiesPlacedThisTurn(0);
        }
    }

    private void diceRollingDelay(){
        try {
            Thread.sleep(DICE_ROLLING_DELAY);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }
    }

    private boolean areThereEnoughPlayers(){
        int numberOfPlayers = match.getPlayers().size();
        return  numberOfPlayers >= MIN_PLAYERS && numberOfPlayers <= MAX_PLAYERS;
    }

    private void setTheOrderOfPlayers(){
        List<Player> orderedPlayers = new ArrayList<>();
        List<Player> players = match.getPlayers();

        while (players.size() > 0){
            int index = (int) (Math.random() * players.size());
            orderedPlayers.add(players.get(index));
            players.remove(index);
        }

        match.setPlayers(orderedPlayers);
        match.setPlayerOnDuty(match.getPlayers().get(0));
    }

    private void assignsArmiesToPlayers(){
        List<Player> players = match.getPlayers();
        int armies = 50 - players.size() * 5;

        for (Player player : match.getPlayers()) {
            player.setAvailableArmies(armies);
        }
    }

    private void assignMissionsToPlayers(){

        List<Mission> missions = missionsService.getMissions();
        Collections.shuffle(missions);

        int index = 0;
        for(Player player : match.getPlayers()){
            player.setMission(missions.get(index));
            index++;
        }
    }

    private void distributionOfTerritoriesToPlayers(){
        List<Territory> territories = match.getMap().getTerritories();
        List<Player> players = match.getPlayers();

        Collections.shuffle(territories);

        int playerIndex = 0;
        for(Territory territory : territories){
            territory.setOwner(players.get(playerIndex));
            playerIndex++;
            if(playerIndex>=players.size()) playerIndex = 0;
        }
    }

    private void setDeckOfCards(){
        List<Card> cards = new ArrayList<>();

        //Add territorial cards
        for (Territory territory: match.getMap().getTerritories()) {
            cards.add(new Card(cards.size(), territory, territory.getCardType()));
        }

        //Add jolly cards
        for (int i=0; i<NUMBER_OF_JOLLY_IN_THE_DECK; i++){
            cards.add(new Card(cards.size(), CardType.JOLLY));
        }

        Collections.shuffle(cards);
        match.setCards(cards);
    }

    private void placeMinimumArmiesOnEachTerritory(){
        List<Territory> territories = match.getMap().getTerritories();
        List<Player> players = match.getPlayers();

        for(Territory territory : territories){
            if(territory.getPlacedArmies() < MIN_ARMIES_FOR_TERRITORY){
                placeArmies(territory, MIN_ARMIES_FOR_TERRITORY);
            }
        }

        for( Player player : players){
            resetPlayerActions(player);
        }
    }

    private void calculateWinner(){
        List<Player> activePlayers = match.getActivePlayers();

        if(activePlayers.size() == 1) match.setWinner(activePlayers.get(0));
        else{
            for (Player player : activePlayers) {
                if (player.getMission().isMissionCompleted(player, match)) {
                    match.setWinner(player);
                }
            }
        }

        if(match.getWinner() != null) match.setStage(GAME_OVER);
    }

    private void placeArmies(Territory territory, int armies){
        Player player = territory.getOwner();
        int availableArmies = player.getAvailableArmies();

        if( availableArmies >= armies ){
            player.setAvailableArmies(availableArmies - armies);
            player.increaseArmiesPlacedThisTurn(armies);
            territory.addArmies(armies);
        }
    }

    private boolean checkArmiesToPlace(Map<String, Integer> armiesToPlace){
        GameMap map = match.getMap();
        Player player = match.getPlayerOnDuty();
        boolean isPlayerTheOwner = true;
        boolean isNumberOfArmiesCorrect = true;
        boolean areAvailableArmiesEnough = true;
        int totalArmiesToPlace = 0;

        for (Map.Entry<String, Integer> entry : armiesToPlace.entrySet()) {
            Territory territory = map.getTerritory(entry.getKey());

            // Is player the owner of target territories?
            isPlayerTheOwner = territory.getOwner().equals(player);

            totalArmiesToPlace += entry.getValue();
        }

        // Is the number of armies consistent with the stage of the turn?
        switch (match.getStage()){
            case INITIAL_PLACEMENT: isNumberOfArmiesCorrect = totalArmiesToPlace <= INITIAL_ARMIES_TO_PLACE; break;
            case PLACEMENT: isNumberOfArmiesCorrect = true; break;
            default: isNumberOfArmiesCorrect = totalArmiesToPlace == 0; break;
        }

        // Are armies > 0
        if(isNumberOfArmiesCorrect) isNumberOfArmiesCorrect = totalArmiesToPlace > 0;

        // Does player have enough armies available?
        areAvailableArmiesEnough = player.getAvailableArmies() >= totalArmiesToPlace;

        return isPlayerTheOwner && isNumberOfArmiesCorrect && areAvailableArmiesEnough;
    }

    private void prepareAttackStage(){
        Territory territoryFrom = match.getTerritoryFrom();
        Territory territoryTo = match.getTerritoryTo();

        //Caso di conquista
        if(territoryFrom != null && territoryTo != null && match.isMovementConfirmed()){
            deselectTerritories();
            if(territoryFrom.getPlacedArmies() >= MINIMUM_ATTACKING_ARMIES) {
                match.setAttacker(territoryFrom);
            }
            if(territoryFrom.getPlacedArmies() < MINIMUM_ATTACKING_ARMIES && territoryTo.getPlacedArmies() >= MINIMUM_ATTACKING_ARMIES) {
                match.setAttacker(territoryTo);
            }
            match.setMovementConfirmed(false);
        }
    }

    private void prepareDisplacementStage(){
        if(match.isMovementConfirmed()){
            endsTurn();
        }
        return;
    }

    private void prepareGameOverStage(){
        wsServices.sendsUpdatedMatchToPlayers(match.getId());
    }


    //Seleziona un proprio territorio dal quale sia possibile attaccare
    public void selectAttacker(String territoryId){
        Territory territory = match.getMap().getTerritory(territoryId);
        Player owner = territory.getOwner();

        //Se è il turno del giocatore e il territorio selezionato ha almeno due armate
        //Allora setta il territorio come attaccante
        if(match.getPlayerOnDuty().equals(owner) && territory.getPlacedArmies() >= MINIMUM_ATTACKING_ARMIES){
            match.setAttacker(territory);
            match.setDefender(null);
            match.setTerritoryTo(null);
            match.setTerritoryFrom(null);
        }

        prepareStage();
    }

    //Seleziona un proprio territorio dal quale sia possibile attaccare
    public void selectDefender(String territoryId){
        Territory territory = match.getMap().getTerritory(territoryId);

        //Se il territorio è confinante con l'attaccante setta il territorio come difensore
        if(territory.isBordering(match.getAttacker())){
            match.setDefender(territory);
            match.setTerritoryTo(null);
            match.setTerritoryFrom(null);
        }
        prepareStage();
    }

    //Deseleziona un territorio che sia quello attaccante o quello difensivo
    public void deselectTerritory(String territoryId){
        //Se il territorio è quello attaccante lo deseleziona e deseleziona pure quello difensivo
        if(match.getAttacker()!= null && match.getAttacker().getId().equals(territoryId)){
            if(
                    match.getDefender() != null
                    && match.getDefender().getOwner().equals(match.getAttacker().getOwner())
                    && match.getDefender().getPlacedArmies() >= MINIMUM_ATTACKING_ARMIES
            ){
                match.setAttacker(match.getDefender());
            }
            else{
                match.setAttacker(null);
            }
            match.setDefender(null);
        }

        //Se il territorio è quello difensivo lo deseleziona
        if(match.getDefender()!= null && match.getDefender().getId().equals(territoryId)){
            match.setDefender(null);
        }

        //Se il territorio è quello dal quale spostare le armate deseleziona pure quello di destinazione
        if(match.getTerritoryFrom()!= null && match.getTerritoryFrom().getId().equals(territoryId)){
            match.setTerritoryFrom(null);
            match.setTerritoryTo(null);
        }

        //Se il territorio è quello al quale destinare le armate lo deseleziona
        if(match.getTerritoryTo()!= null && match.getTerritoryTo().getId().equals(territoryId)){
            match.setTerritoryTo(null);
        }

        prepareStage();
    }

    //Deseleziona tutti i territori
    private void deselectTerritories(){
        match.setAttacker(null);
        match.setDefender(null);
        match.setTerritoryFrom(null);
        match.setTerritoryTo(null);
    }


    //Inizia la dase di spostamento
    public void displacementStage(){
        deselectTerritories();
        match.setStage(DISPLACEMENT);
        match.setMovementConfirmed(false);
        prepareStage();
    }

    //Seleziona il territorio dal quale spostare le armate
    public void selectTerritoryFrom(String territoryId){
        Territory territory = match.getMap().getTerritory(territoryId);
        if(territory.getOwner().getId().equals(match.getPlayerOnDuty().getId()) && territory.getPlacedArmies() > MIN_ARMIES_FOR_TERRITORY){
            match.setTerritoryFrom(territory);
            match.setDefender(null);
        }

        prepareStage();
    }

    //Seleziona il territorio sul quale spostare le armate
    public void selectTerritoryTo(String territoryId){
        Territory territory = match.getMap().getTerritory(territoryId);

        if(     territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                && match.getTerritoryFrom() != null
                && territory.getOwner().getId().equals(match.getTerritoryFrom().getOwner().getId())){
            if(territory.isBordering(match.getTerritoryFrom())) {
                match.setTerritoryTo(territory);
                match.setDefender(null);
            }
            else match.setTerritoryFrom(territory);
        }

        prepareStage();
    }

    //Gioca il tris nel caso sia il proprio turno ed è la fase del piazzamento delle armate
    public void playCards(String playerId, Integer[] cardsId){
        Player player = match.getPlayerOnDuty();
        int bonusArmies = 0;
        int availableArmies = player.getAvailableArmies();
        List<Card> playerCards = new ArrayList<>();
        boolean bonus = false;

        if(player.getId().equals(playerId) && match.getStage().equals(PLACEMENT) && cardsId.length == SET_CARDS_NUMBER){

            //Get cards
            for(int cardId : cardsId){
                playerCards.add(player.getCard(cardId));
            }

            //Cow set
            if(!bonus){
                bonus = true;
                for(Card card : playerCards){
                    if(!card.getCardType().equals(COW)){
                        bonus = false; break;
                    }
                }
                if(bonus) bonusArmies = COW_SET_BONUS;
            }

            //Farmer set
            if(!bonus) {
                bonus = true;
                for (Card card : playerCards) {
                    if (!card.getCardType().equals(FARMER)) {
                        bonus = false;
                        break;
                    }
                }
                if (bonus) bonusArmies = FARMER_SET_BONUS;
            }

            //Tractor set
            if(!bonus) {
                bonus = true;
                for (Card card : playerCards) {
                    if (!card.getCardType().equals(TRACTOR)) {
                        bonus = false;
                        break;
                    }
                }
                if (bonus) bonusArmies = TRACTOR_SET_BONUS;
            }

            //All different set
            if(!bonus) {
                bonus = true;
                for (int i = 0; i < playerCards.size(); i++) {
                    if (playerCards.get(i).getCardType().equals(JOLLY)) {
                        bonus = false;
                        break;
                    }
                    for (int j = i + 1; j < playerCards.size(); j++) {
                        if (playerCards.get(i).getCardType().equals(playerCards.get(j).getCardType())) {
                            bonus = false;
                            break;
                        }
                    }
                }
                if (bonus) bonusArmies = DIFFERENT_CARDS_SET_BONUS;
            }

            //Jolly set
            if(!bonus) {
                bonus = true;
                boolean jolly = false;
                CardType cardType = null;

                for (int i = 0; i < playerCards.size(); i++) {
                    if (playerCards.get(i).getCardType().equals(JOLLY)) {
                        if(jolly) bonus = false; //Caso di più jolly nel tris
                        jolly = true;
                    }
                }
                for (int i = 0; i < playerCards.size(); i++) {
                    if (!playerCards.get(i).getCardType().equals(JOLLY)) {
                        if(cardType == null) cardType = playerCards.get(i).getCardType();
                        else{
                            if(!cardType.equals(playerCards.get(i).getCardType())){
                                bonus = false;
                            }
                        }
                    }
                }
                if (bonus && jolly) bonusArmies = JOLLY_SET_BONUS;
            }

            //Caso in cui il tris è valido
            if(bonus){

                //Bonus owner
                for(Card card : playerCards){
                    if(!card.getCardType().equals(JOLLY)){
                        Player owner = match.getMap().getTerritory(card.getTerritoryId()).getOwner();
                        if(owner.getId().equals(player.getId())) bonusArmies += CARD_TERRITORY_BONUS;
                    }
                }

                //Assegnazione delle armate bonus
                player.setAvailableArmies(availableArmies + bonusArmies);

                //Le carte giocate vengono tolte dal giocatore e rimesse nel mazzo
                for(Card card : playerCards){
                    returnACard(player, card);
                }
            }
        }
    }

    //Calcola e assegna le armate disponibili per il piazzamento al giocatore di turno.
    private void assignArmiesToThePlayer(){
        Player player = match.getPlayerOnDuty();
        int territoriesCounter = match.getTerritoriesOwned(player).size();
        List<Continent> continentsOwned = match.getContinentsOwned(player);

        //Se è il primo turno del giocatore allora non vengono assegnate armate
        if( match.getTurn() < match.getPlayers().size()) return;

        //Armate disponibili in base al numero di territori posseduti dal giocatore
        int armiesAvailable = territoriesCounter / TERRITORIES_FOR_AN_ARMY;
        if(armiesAvailable <= 0) armiesAvailable = MINIMUM_AVAIABLE_ARMIES;

        //Aggiunta del bonus armate dovuto ai continenti in possesso del giocatore
        for(Continent continent : continentsOwned){
            armiesAvailable += continent.getBonusArmies();
        }

        //Assegnazione delle armate disponibili per il giocatore
        player.setAvailableArmies(armiesAvailable);

        //Segna che le armate sono state assegnate
        match.setArmiesWereAssigned(true);
    }

    //Individua in base alla fase di gioco i territori cliccabili dal giocatore
    private void setSelectableTerritories(){
        //Azzera i selezionabili
        for (Territory territory: match.getMap().getTerritories()) {
            territory.setSelectable(false);
        }

        //Fase di piazzamento
        if(match.getStage().equals(INITIAL_PLACEMENT) || match.getStage().equals(PLACEMENT)){
            for(Territory territory : match.getMap().getTerritories()){
                if(territory.getOwner() != null
                        && territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                ){
                    territory.setSelectable(true);
                }
            }
        }

        //Fase di attacco
        if(match.getStage().equals(ATTACK)){
            //Se bisogna fare lo spostamento perché si è conquistato un territorio non sono selezionabili altri territori
            if(     match.getTerritoryFrom() != null
                    && match.getTerritoryTo() != null
                    && match.getTerritoryFrom().getOwner().getId().equals(match.getTerritoryTo().getOwner().getId())
                    && match.getTerritoryFrom().getPlacedArmies() > MIN_ARMIES_FOR_TERRITORY
            ) return;

            //Va selezionato un attaccante
            if(match.getAttacker() == null){
                for(Territory territory : match.getMap().getTerritories()){
                    if(     territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                            && territory.getPlacedArmies() >= MINIMUM_ATTACKING_ARMIES){
                        territory.setSelectable(true);
                    }
                }
            }
            //Va selezionato un difensore o un altro attaccante
            if(match.getAttacker() != null){
                for(Territory territory : match.getMap().getTerritories()){
                    if(
                        (   //Se il territorio è mio e ha abbastanza armate per un attacco e non è il territorio attaccante
                            territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                            && territory.getPlacedArmies() >= MINIMUM_ATTACKING_ARMIES
                            && !territory.getId().equals(match.getAttacker().getId())
                        )
                            ||
                        (   //Se il territorio è confinante all'attaccante e non è mio
                            territory.isBordering(match.getAttacker())
                            && !territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                        )
                    ){
                        territory.setSelectable(true);
                    }
                }
            }
        }

        //Fase di spostamento
        if(match.getStage().equals(DISPLACEMENT)){
            for(Territory territory : match.getMap().getTerritories()){
                //Va selezionato un territorio con abbastanza armate spostabili da cui trasferire le armate
                if(match.getTerritoryFrom() == null){
                    if(     territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                            && territory.getPlacedArmies() > MIN_ARMIES_FOR_TERRITORY){
                        territory.setSelectable(true);
                    }
                }
                //Va selezionato un proprio territorio sul quale spostare le armate
                //Oppure un territorio non confinante dal quale spostare le armate
                if(match.getTerritoryFrom() != null && match.getTerritoryTo() == null){
                    if(     !territory.getId().equals(match.getTerritoryFrom().getId()) &&
                            (territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                            && territory.isBordering(match.getTerritoryFrom()))
                            ||
                            (territory.getOwner().getId().equals(match.getPlayerOnDuty().getId())
                            && territory.getPlacedArmies() > MIN_ARMIES_FOR_TERRITORY)
                    ){
                        territory.setSelectable(true);
                    }
                }
            }
        }
    }

    //Ritorna un array con i dadi a disposizione del difensore
    private List<Integer> getDicesDefender(){
        List<Integer> listDices = new ArrayList<>();
        Territory defender = match.getDefender();
        int armies = 0;
        int numDices = 0;

        if(defender != null) armies = defender.getPlacedArmies();
        if(armies > MAX_ATTACKING_DICES) numDices = MAX_ATTACKING_DICES;
        else numDices = armies;

        for(int i=0; i<numDices; i++) listDices.add(5);

        return listDices;
    }

    //Ritorna la lista di dadi disponibili per l'attacco
    private List<Integer> getDicesAttacker(int numberOfAttackerDice) {
        List<Integer> listDices = new ArrayList<>();
        int attackerArmies = match.getAttacker().getPlacedArmies();
        int maxDiceAvailable = Integer.min(attackerArmies -1, MAX_ATTACKING_DICES);

        for(int i=0; i<Integer.min(maxDiceAvailable, numberOfAttackerDice); i++){
            listDices.add(5);
        }

        return listDices;
    }

    //Lancia i dadi passati come parametro e li ordina dal valore maggiore al minore
    private void diceRoll(List<Integer> diceList){
        Random random = new Random();

        for (int i=0; i<diceList.size(); i++){
            diceList.set(i, random.nextInt(MAX_DICE_VALUE) + MIN_DICE_VALUE);
        }

        Collections.sort(diceList);
        Collections.reverse(diceList);
    }

    //Nel caso in cui l'attaccante sconfiggesse tutte le armate del difensore allora conquista il territorio attaccato
    private void conquest(int attackArmies){
        Territory attackerTerritory = match.getAttacker();
        Territory defenderTerritory = match.getDefender();
        Player player = match.getPlayerOnDuty();
        Player defender = defenderTerritory.getOwner();

        /*Se il difensore non ha più armate, l'attaccante diventa il proprietario del territorio
        e ci vengono trasferite le armate che hanno attaccato*/
        if(defenderTerritory.getPlacedArmies() <= 0){
            defenderTerritory.setOwner(attackerTerritory.getOwner());

            //Set the minimum movement
            match.setTerritoryFrom(match.getAttacker());
            match.setTerritoryTo(match.getDefender());
            moveArmies(match.getTerritoryFrom(), match.getTerritoryTo(), attackArmies, false);

            /*If there are no more possible movement select the conquest territory as the attacker
            if(defenderTerritory.getPlacedArmies() <= MIN_ARMIES_FOR_TERRITORY){
                match.setTerritoryFrom(null);
                match.setTerritoryTo(null);
                match.setAttacker(defenderTerritory);
                match.setDefender(null);
            }
            */

            player.setMustDrawACard(true);     //A fine turno il giocatore potrà pescare una carta
            match.setMovementConfirmed(false);

            //Controlla se il giocatore sconfitto ha perso tutti i territori
            List<Territory> territories = match.getTerritoriesOwned(defender);
            if(territories.size() == 0){
                player.addDefeatedPlayer(defender);
                player.addCards(defender.takeCards());
                defender.setActive(false);
            }

            //Controlla se c'è un vincitore
            calculateWinner();
        }
    }

    //Inizia il turno successivo
    public void endsTurn(){
        Player player = match.getPlayerOnDuty();

        //If the player has conquered a territory this turn then draws a card
        if(player.isMustDrawACard()) drawACard(player);

        //Reset parameters
        player.setArmiesPlacedThisTurn(0);
        match.setMovementConfirmed(false);
        match.setArmiesWereAssigned(false);
        deselectTerritories();

        nextTurn();

        prepareStage();
    }

    private boolean isTheFirstTurnOfThePlayer(Player player){
        int positionOfThePlayer = match.getActivePlayers().indexOf(player) + 1;
        int turn = match.getTurn();
        boolean isTheFirstTurn = turn == positionOfThePlayer;

        return  isTheFirstTurn;
    }

    //Ritorna il giocatore attivo successivo
    private Player getNextPlayer(){
        List<Player> players = match.getPlayers();
        Player turnPlayer = match.getPlayerOnDuty();
        Player nextPlayer = null;

        int index = players.indexOf(turnPlayer);
        boolean playerFound = false;

        while(!playerFound){
            //Seleziona giocatore successivo
            index++;
            if(index >= players.size()) index = 0;
            nextPlayer = players.get(index);
            playerFound = nextPlayer.isActive();
            if(nextPlayer.equals(turnPlayer)) {
                playerFound = true;
                nextPlayer = null;
            }
        }

        return nextPlayer;
    }

    //Ritorna il primo giocatore attivo
    private Player firstActivePlayer(){
        List<Player> players = match.getPlayers();
        Player firstActivePlayer = null;

        int index = 0;
        boolean playerFound = false;

        while(!playerFound){
            if(index >= players.size()) return null;
            if(players.get(index).isActive()){
                firstActivePlayer = players.get(index);
                playerFound = true;
            }
            index++;
        }

        return firstActivePlayer;
    }

    //Ritorna il giocatore attivo successivo
    private Player getNextPlayer(Player player){
        List<Player> players = match.getPlayers();
        Player nextPlayer = null;
        int index = players.indexOf(player);
        boolean playerFound = false;

        while(!playerFound){
            //Seleziona giocatore successivo
            index++;
            if(index>=players.size()) index = 0;
            nextPlayer = players.get(index);
            playerFound = nextPlayer.isActive();
            if(nextPlayer.equals(player)) {
                playerFound = true;
                nextPlayer = null;
            }
        }
        return nextPlayer;
    }

    //Pesca una carta
    private void drawACard(Player player){
        List<Card> cards = match.getCards();

        if(player.isMustDrawACard() && cards.size()>0){
            Card card = cards.get(0);
            player.addCard(card);
            cards.remove(0);
        }

        player.setMustDrawACard(false);
    }

    //Riponi la carta nel mazzo
    private void returnACard(Player player, Card card){
        if(player.hasCard(card)){
            player.removeCard(card);
            match.getCards().add(card);
        }
    }

    private boolean isInitialPlacementOver(){
        return nextPlayerWithAvailableArmies() == null;
    }

    //Ritorna il primo giocatore seguendo il giro che abbia ancora armate disponibili
    private Player nextPlayerWithAvailableArmies(){
        Player nextPlayer = null;
        Player turnPlayer = match.getPlayerOnDuty();
        Player currentPlayer = getNextPlayer();

        //Controlla se ci sono giocatori attivi
        List<Player> activePlayers = match.getActivePlayers();

        //Cicla finché non trova il porssimo giocatore con armate disponibili
        if(activePlayers.size() > 1){
            while (nextPlayer == null && !currentPlayer.getId().equals(turnPlayer.getId())){
                if(currentPlayer.getAvailableArmies() > 0) nextPlayer = currentPlayer;
                else currentPlayer = getNextPlayer(currentPlayer);
            }
        }

        return nextPlayer;
    }



    //Fase di spostamento delle armate, indica le armate da spostare
    public void displaceArmies(String territoryFromId, String territoryToId, int armies, boolean deselectAfterMove){
        Territory territoryFrom = match.getMap().getTerritory(territoryFromId);
        Territory territoryTo = match.getMap().getTerritory(territoryToId);

        moveArmies(territoryFrom, territoryTo, armies, deselectAfterMove);

        //Dopo lo sopostamento, se è in fase di attacco seleziona come attaccante per la porssima fase il territorio con più armate che è stato coinvolto nello spostamento
        if(match.getStage().equals(ATTACK)){
            if(territoryFrom.getPlacedArmies() > territoryTo.getPlacedArmies()){
                selectAttacker(territoryFrom.getId());
            }
            else selectAttacker(territoryTo.getId());
        }

        prepareStage();
    }

    //Sposta le armate da un territorio a un altro
    private void moveArmies(Territory territoryFrom, Territory territoryTo, int armies, boolean deselectAfterMove){
        //Sposta solo se i territori sono confinanti e se il numero di armate è coerente
        if( territoryFrom != null
            && territoryTo != null
            && territoryFrom.isBordering(territoryTo)
            && territoryFrom.getPlacedArmies() - armies >= MIN_ARMIES_FOR_TERRITORY
            && territoryTo.getPlacedArmies() + armies >= MIN_ARMIES_FOR_TERRITORY
            && armies >= 0
        ) {

            territoryFrom.removeArmies(armies);
            territoryTo.addArmies(armies);

            //Se il flag è true deseleziona tutti i territori
            if(deselectAfterMove) deselectTerritories();

            match.setMovementConfirmed(true);
        }
    }

    public void surrender(String playerId){
        List<Player> players = match.getPlayers();
        for (Player player: players) {
            if(player.getId().equals(playerId)){
                player.setActive(false);
                endsTurn();
                break;
            }
        }
    }
}
