import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import Map from "../components/Map";
//import Map from "../components/Map2";
import Mission from "../components/Mission";
import GameCard from "../components/GameCard";
import '../styles/Match.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../js/armiesPalette";
import MatchController from '../js/MatchController';

const Data = require("../js/data").default;
const WebSocket = require("../js/webSocket").default;
const client = WebSocket.getClient();


function Match() { 
    const navigate = useNavigate();
    let { id } = useParams();
    const [match, setMatch] = useState(Data.getMatch());
    const [player, setPlayer] = useState(MatchController.getPlayer(match));
    const [cards, setCards] = useState([]);
    const [placedArmies, setPlacedArmies] = useState({});   //Armate piazzate durante il turno
    const [movedArmies, setMovedArmies] = useState(0);      //Armate mosse durante il turno
        

    useEffect(()=>{
        try{
            //Iscrizione al websocket
            client.subscribe( "/user/queue/match", function (payload) { 
            setMatch(JSON.parse(payload.body));
        });
        }
        catch(e){
          console.error(e);
          navigate("/"); 
        }
    },[id, navigate]);

    useEffect( ()=>{
        try{
            console.dir(match);
            setPlayer(MatchController.getPlayer(match));
            setPlacedArmies({});    //Reset
            setMovedArmies(0);      //Reset
        }
        catch(e){
          console.error(e);
          navigate("/"); 
        }
    }, [match, navigate] );

    useEffect( ()=>{ 
        if(player !== null){setCards(player.cards)}
    }, [player, navigate]);

    if(player === null) {console.error("Player null exception"); navigate("/"); return null;}

    let theme = createTheme(getTheme(player.color));

    const onClickHandler = (e) => {
        if(e.target.className.animVal.includes("territory")) {
            let territories = match.map.territories;
            let territoryId = e.target.parentElement.id;

            //Piazzamento armate durante il proprio turno
            if((match.stage === "INITIAL_PLACEMENT" || match.stage === "PLACEMENT") && match.playerOnDuty.id === player.id){
                for(let i=0; i<territories.length; i++){
                    if(territories[i].id === territoryId && territories[i].owner.id === player.id){
                        try{                   
                            MatchController.placeArmy(match, territories[i].id, placedArmies, setPlacedArmies);
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
            if(match.stage === "ATTACK" && match.playerOnDuty.id === player.id){
                
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
            if(match.stage === "DISPLACEMENT" && match.playerOnDuty.id === player.id){
                
                for(let i=0; i<territories.length; i++){
                    //Selezione del territorio da cui spostare le armate
                    if(territories[i].id === territoryId && territories[i].owner.id === player.id && territories[i].clickable === true && match.territoryFrom === null){                        
                        try{MatchController.selectTerritoryFrom(match, territories[i], setMatch);}
                        catch(e){
                          console.error(e);
                          navigate("/"); 
                        }
                        break;
                    }

                    //Selezione del territorio su cui spostare le armate
                    if(territories[i].id === territoryId && territories[i].owner.id === player.id && territories[i].clickable === true && match.territoryFrom !== null){                        
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
        if(player.id === match.playerOnDuty.id){
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
        let newCards = JSON.parse(JSON.stringify(cards));
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
        
        setCards(newCards);
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

    return (
        <ThemeProvider theme = {theme}>
            <div className="match">
                <div className="mission_div">
                    <Mission 
                        className="mission"
                        description = {player.mission.description}
                    /> 
                </div>                    
                {getGameCards(cards)}
                <Map               
                    className="map menu"  
                    match = {match}
                    player = {player}
                    placedArmies = {placedArmies}
                    movedArmies = {movedArmies}
                    onClick = {onClickHandler}
                    onMouseOver = {onMouseOverHandler}
                    onMouseOut = {onMouseOutHandler}
                />
                <ControlPanel 
                    match = {match} 
                    player = {player} 
                    cards = {cards} 
                    setMatch = {setMatch} 
                    movedArmies = {movedArmies} 
                    setMovedArmies = {setMovedArmies}/>
            </div>   
        </ThemeProvider>             
    );    
}

export default Match;
