import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import GameMap from "../components/Map";
import { UserContext } from './App';
import Mission from "../components/Mission";
import GameCard from "../components/GameCard";
import '../styles/Match.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../js/armiesPalette";
import MatchController, { getMatch, getPlayer, placeArmies } from '../js/matchActions';
import axios from 'axios';
import endPoint from "../js/endPoint";

function Match() { 
    const navigate = useNavigate();
    let { id: matchId } = useParams();
    const {client, userId, isConnect} = useContext(UserContext);
    const [match, setMatch] = useState(null);
    const [player, setPlayer] = useState(null);
    const [armiesToPlaceThisTurn, setArmiesToPlaceThisTurn] = useState({});
    const [movedArmiesThisTurn, setMovedArmiesThisTurn] = useState(0);     //Armate mosse durante il turno        

    useEffect(()=>{

        const fetchData = async () => {
            try{
                let match = await getMatch( matchId );
                setMatch(match);
            }
            catch( error ){
                console.error(error)
            }
        }

        fetchData();
        if(isConnect) socketSubscription();
        
    },[matchId, isConnect]);

    useEffect(()=>{
        let player = getPlayer(match, userId);
        setPlayer(player);
    },[match, userId])

    const socketSubscription = () => {

        const subscribe = () => {
            client.subscribe( "/user/queue/match", function (payload) { 
                console.log("Upload match from socket subscription")
                let matchUpdated = JSON.parse(payload.body)
                console.dir(matchUpdated)
                setMatch(matchUpdated);
            })
        }

        try{
            subscribe()
        }
        catch(e){
            client.onConnect(() => { subscribe() }) 
        }
    }

    const onClickHandler = (e) => {
        if( !e.target.className.animVal.includes("territory")) return

        let territories = match.map.territories;
        let territoryId = e.target.parentElement.id;            
        
        if(canPlayerPlaceArmies()){ 
            placeArmyHandler( territoryId ) 
            return
        }

        //Fase di attacco durante il proprio turno
        if(match.stage === "ATTACK" && match.playerOnDutyId === userId){
            
            for(let i=0; i<territories.length; i++){
                //Selezione del territorio attaccante
                if(territories[i].id === territoryId && territories[i].ownerId === player.id && territories[i].selectable === true){ 
                    try{
                        selectAttacker(territories[i])
                    }
                    catch(e){
                        console.error(e)
                    }
                    break;
                }

                //Selezione del territorio difensore
                if(territories[i].id === territoryId && !territories[i].ownerId !== player.id && territories[i].selectable === true && match.attacker !== null){ 
                    try{
                        selectDefender(territories[i])
                    }
                    catch(e){
                        console.error(e);
                    }
                    break;
                }
            }
        }

        //Fase di spostamento delle armate
        if(match.stage === "DISPLACEMENT" && match.playerOnDutyId === userId){
            
            for(let i=0; i<territories.length; i++){
                //Selezione del territorio da cui spostare le armate
                if(territories[i].id === territoryId && territories[i].ownerId === userId && territories[i].selectable === true && match.territoryFrom === null){                        
                    try{MatchController.selectTerritoryFrom(match, territories[i], setMatch);}
                    catch(e){
                        console.error(e);
                        navigate("/"); 
                    }
                    break;
                }

                //Selezione del territorio su cui spostare le armate
                if(territories[i].id === territoryId && territories[i].ownerId === userId && territories[i].selectable === true && match.territoryFrom !== null){                        
                    try{MatchController.selectTerritoryTo(match, territories[i], setMatch);}
                    catch(e){
                        console.error(e);
                        navigate("/"); 
                    }
                    break;
                }
            }
        } 
    }
    
    const onMouseOverHandler = (e) => {        
        if(userId === match.playerOnDutyId){
            let territories = match.map.territories;
            let territoryId = e.target.parentElement.id;        
            for(let i=0; i < territories.length; i++){
                if(territories[i].id === territoryId && territories[i].selectable === true){
                    e.target.parentElement.children[0].style.opacity = "0.6";
                    e.target.parentElement.style.cursor = "pointer";
                    break;
                }
            }
        }        
    }

    const onMouseOutHandler = (e) => {        
        if(e.target.className.animVal.includes("territory")) {   
            e.target.parentElement.children[0].style.opacity = '1';   
            e.target.parentElement.style.cursor = "default";
        };
    }    

    const deselectCards = (newCards) => {
        for(let i=0; i<newCards.length; i++){ newCards[i].selected = false; }
    } 

    const selectCard = (id) => {
        let newCards = JSON.parse(JSON.stringify(player.cards));
        let selectedCards = 0;

        //Conta quante carte sono selezionate esclusa l'ultima
        for(let i=0; i<newCards.length; i++){
            if(newCards[i].selected === true) selectedCards++;
        }

        for(let i=0; i<newCards.length; i++){
            if(newCards[i].id === id){
                //Se la carta è già selezionata allora deselezionale tutte
                if(newCards[i].selected === true) deselectCards(newCards);
                else {
                    //se la carta non è selezionata selezionala, se c'erano già tre carte selezionate quelle vengono deselezionate
                    if(selectedCards === 3) deselectCards(newCards);
                    newCards[i].selected = true;                    
                }             
            }            
        }   
        
        player.cards = newCards;
        setPlayer(JSON.parse(JSON.stringify(player)));
    } 

    const getGameCards = (cards) => {
        let cardList = [];
        let component = null;

        for(let i=0; i<cards.length; i++){
            cardList[i] = (
                <GameCard 
                    key={cards[i].id}
                    className="gameCard" 
                    onClick = {() => selectCard(cards[i].id)}
                    card={cards[i]}
                    player={player}
                    territories = {match.map.territories}>
                </GameCard>
            )
        }
    
        if(cardList.length>0){
            component = <div className="cardList"> {cardList} </div>
        }

        return component;
    } 

    const canPlayerPlaceArmies = () => {

        if(player === null) return false

        let response = (
            player.id === match.playerOnDutyId
            && player.availableArmies > 0
            && (
                (match.stage === "INITIAL_PLACEMENT" && Number(player.armiesPlacedThisTurn) < 3) 
                || match.stage === "PLACEMENT"
            )
        )

        console.log("canPlayerPlaceArmies? " + player.armiesPlacedThisTurn, player.availableArmies + " response: " + response)

        return response
    }

    const placeArmyHandler = ( territoryId ) => {

        let territory = getTerritoryById(territoryId)

        if(territory.ownerId === userId){
            
            player.armiesPlacedThisTurn++
            player.availableArmies--
            setPlayer(JSON.parse(JSON.stringify(player)))
            placeOneArmy( territoryId )

            if(!canPlayerPlaceArmies() && !(armiesToPlaceThisTurn === null)){
                console.log("You can't place armies no more ")
                placeArmies(matchId, armiesToPlaceThisTurn, setArmiesToPlaceThisTurn)
            }
            else{
                console.log("You can still place armies")
            }
        }
    }

    const placeOneArmy = ( territoryId ) => {    

        let newArmiesToPlaceThisTurn = armiesToPlaceThisTurn

        if(newArmiesToPlaceThisTurn === undefined) newArmiesToPlaceThisTurn = {}

        let armiesToPlace = newArmiesToPlaceThisTurn[territoryId]
        if( armiesToPlace === undefined ){
            armiesToPlace = 1
        }
        else armiesToPlace++
    
        newArmiesToPlaceThisTurn[territoryId] = armiesToPlace

        console.dir(newArmiesToPlaceThisTurn)
        console.log(player.armiesPlacedThisTurn)
        setArmiesToPlaceThisTurn(JSON.parse(JSON.stringify(newArmiesToPlaceThisTurn)))
    }

    const getTerritoryById = (territoryId) => {
        let territories = match.map.territories
        let targetTerritory = null
    
        for(let i=0; i < territories.length; i++){
    
            let territory = territories[i];
    
            if( territory != null && territory.id === territoryId){
                targetTerritory = territory
                break
            }
        }
    
        return targetTerritory
    }

    const getMatchComponent = () => {

        if( match === undefined || match === null || JSON.stringify(match) === '{}' || JSON.stringify(player) === '{}'){
            console.log("Match is null")
            return null;
        }
        if( player === null ){
            console.log("Player is null")
            return null;
        }

        return (
            <div className="match">
                <div className="mission_div">
                    <Mission 
                        className="mission"
                        mission = {player.mission}
                    /> 
                </div>                    
                { getGameCards(player.cards) }
                <GameMap               
                    className="map menu"  
                    match = { match }
                    player = { player }
                    placedarmies = { armiesToPlaceThisTurn }
                    movedarmies = { movedArmiesThisTurn }
                    onClick = { onClickHandler }
                    onMouseOver = { onMouseOverHandler }
                    onMouseOut = { onMouseOutHandler }
                />
                <ControlPanel 
                    match = {match} 
                    player = {player} 
                    cards = {player.cards} 
                    setMatch = {setMatch} 
                    movedArmies = {movedArmiesThisTurn} 
                    setMovedArmies = {setMovedArmiesThisTurn}/>
            </div>
        )
        
    }

    const selectAttacker = (territory) => {
        console.log("Select the attacker")
        console.dir(match)
        try{
            axios.put(endPoint + '/api/v1/match/select_attacker', {"matchId": match.id, "territoryId": territory.id})
        }
        catch(error){
            console.error(error)
        }
    }

    const selectDefender = (territory) => {
        console.log("Select the defender")
        console.dir(match)
        try{
            axios.put(endPoint + '/api/v1/match/select_defender', {"matchId": match.id, "territoryId": territory.id})
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <ThemeProvider theme = {createTheme(getTheme(player))}>
            {getMatchComponent()}
        </ThemeProvider>             
    );    
}

export default Match;
