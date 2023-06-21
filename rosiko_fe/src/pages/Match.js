import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import Map from "../components/Map";
import { UserContext } from './App';
import Mission from "../components/Mission";
import GameCard from "../components/GameCard";
import '../styles/Match.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../js/armiesPalette";
import MatchController, { getMatch, getPlayer } from '../js/matchActions';

function Match() { 
    const navigate = useNavigate();
    let { id } = useParams();
    const {client, playerId} = useContext(UserContext);
    const [match, setMatch] = useState(null);
    const [player, setPlayer] = useState(null);
    const [placedArmies, setPlacedArmies] = useState(0);   //Armate piazzate durante il turno
    const [movedArmies, setMovedArmies] = useState(0);     //Armate mosse durante il turno        

    useEffect(()=>{

        const fetchData = async () => {
            try{
                let match = await getMatch( id );
                setMatch(match);
            }
            catch( error ){
                console.error(error)
            }
        }

        fetchData();
        socketSubscription();
        
    },[id]);

    useEffect(()=>{
        let player = getPlayer(match, playerId);
        setPlayer(player);
    },[playerId, match])


    const socketSubscription = () => {
        try{
            client.subscribe( "/user/queue/match", function (payload) { 
                console.log("Upload match from socket subscription")
                setMatch(JSON.parse(payload.body));
            })
        }
        catch(e){
            client.onConnect(()=>{
                client.subscribe( "/user/queue/match", function (payload) { 
                    console.log("Upload match from socket subscription")
                    setMatch(JSON.parse(payload.body));
                })
            }) 
        }
    }

    const onClickHandler = (e) => {
        if(e.target.className.animVal.includes("territory")) {
            let territories = match.map.territories;
            let territoryId = e.target.parentElement.id;

            //Piazzamento armate durante il proprio turno
            if((match.stage === "INITIAL_PLACEMENT" || match.stage === "PLACEMENT") && match.playerOnDutyId === playerId){
                for(let i=0; i<territories.length; i++){
                    if(territories[i].id === territoryId && territories[i].owner.id === playerId){
                        try{                   
                            MatchController.placeArmy(player, match, territories[i].id, placedArmies, setPlacedArmies);
                        }
                        catch(e){
                          console.error(e);
                          navigate("/"); 
                        }
                        break;
                    }
                }
            }

            //Fase di attacco durante il proprio turno
            if(match.stage === "ATTACK" && match.playerOnDutyId === playerId){
                
                for(let i=0; i<territories.length; i++){
                    //Selezione del territorio attaccante
                    if(territories[i].id === territoryId && territories[i].owner.id === player.id && territories[i].clickable === true){ 
                        try{MatchController.selectAttacker(match, territories[i], setMatch );}
                        catch(e){
                          console.error(e);
                          navigate("/"); 
                        }
                        break;
                    }

                    //Selezione del territorio difensore
                    if(territories[i].id === territoryId && !territories[i].owner.id !== player.id && territories[i].clickable === true && match.attacker !== null){ 
                        try{MatchController.selectDefender(match, territories[i], setMatch );}
                        catch(e){
                          console.error(e);
                          navigate("/"); 
                        }
                        break;
                    }
                }
            }

            //Fase di spostamento delle armate
            if(match.stage === "DISPLACEMENT" && match.playerOnDutyId === playerId){
                
                for(let i=0; i<territories.length; i++){
                    //Selezione del territorio da cui spostare le armate
                    if(territories[i].id === territoryId && territories[i].owner.id === playerId && territories[i].clickable === true && match.territoryFrom === null){                        
                        try{MatchController.selectTerritoryFrom(match, territories[i], setMatch);}
                        catch(e){
                          console.error(e);
                          navigate("/"); 
                        }
                        break;
                    }

                    //Selezione del territorio su cui spostare le armate
                    if(territories[i].id === territoryId && territories[i].owner.id === playerId && territories[i].clickable === true && match.territoryFrom !== null){                        
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
    }
    
    const onMouseOverHandler = (e) => {        
        if(playerId === match.playerOnDutyId){
            let territories = match.map.territories;
            let territoryId = e.target.parentElement.id;        
            for(let i=0; i < territories.length; i++){
                if(territories[i].id === territoryId && territories[i].clickable === true){
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

        console.log("getGameCards")
        console.dir(player)

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

    const getMatchComponent = () => {

        if( match === undefined || match === null || JSON.stringify(match) === '{}' || JSON.stringify(player) === '{}'){
            console.log("Match is null")
            return null;
        }
        if( player === null ){
            console.log("Player is null")
            return null;
        }


        console.log("Match is not null")
        console.dir(match);

        return (
            <div className="match">
                <div className="mission_div">
                    <Mission 
                        className="mission"
                        mission = {player.mission}
                    /> 
                </div>                    
                { getGameCards(player.cards) }
                <Map               
                    className="map menu"  
                    match = { match }
                    player = { player }
                    placedarmies = { placedArmies }
                    movedarmies = { movedArmies }
                    onClick = { onClickHandler }
                    onMouseOver = { onMouseOverHandler }
                    onMouseOut = { onMouseOutHandler }
                />
                <ControlPanel 
                    match = {match} 
                    player = {player} 
                    cards = {player.cards} 
                    setMatch = {setMatch} 
                    movedArmies = {movedArmies} 
                    setMovedArmies = {setMovedArmies}/>
            </div>
        )
        
    }

    return (
        <ThemeProvider theme = {createTheme(getTheme(player))}>
            {getMatchComponent()}
        </ThemeProvider>             
    );    
}

export default Match;
