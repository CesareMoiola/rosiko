import React from "react";
import '../styles/PlaceArmies.css';
import { Typography, Card, Divider, Button } from "@mui/material";
import Logo from "./Logo";
import { useTheme } from '@mui/styles';
import tractorImage from "../images/tractor.png";
import farmerImage from "../images/farmer.png";
import cowImage from "../images/cow.png";
import { ArmiesTheme } from "../js/armiesPalette";
import MatchController from "../js/matchActions";
import StarIcon from '@mui/icons-material/Star';

const ApiGateway = require("../js/apiGateway").default;

function PlaceArmies(props) {

    const theme = useTheme();
    let primaryColor = theme.palette.primary.main;
    let textColor = theme.palette.primary.contrastText;
    let cards = props.cards;

    //Nel caso in cui il giocatore non è di turno non viene mostrato niente
    if( props.match.playerOnDutyId !== props.player.id ) return null;

    const playCards = () => {        
        let cardSet = [];
    
        for(let i=0; i<cards.length; i++){
            if(cards[i].selected === true) cardSet.push(cards[i]);        
        }

        if(cardSet.length === 3){
            ApiGateway.playCards(props.match, props.player, cardSet);
        }
    }

    const getSelectedCards = () => {
        let selectedCards = [];

        for(let i=0; i < cards.length; i++){
            if(cards[i].selected) selectedCards.push(cards[i]);
        }

        return selectedCards;
    }

    const getImageSource = (card) => {
        let image = null;    
        switch(card.cardType){
          case "TRACTOR": image = <img className="mini_symbol_image" alt="tractor" src={tractorImage}/>; break;
          case "COW": image =  <img className="mini_symbol_image" alt="cow" src={cowImage}/>; break;
          case "FARMER": image = <img className="mini_symbol_image" alt="farmer" src={farmerImage}/>; break;
          case "JOLLY": image = <StarIcon className="mini_symbol_image" sx={{ color: ArmiesTheme["GRAY"].main}}/>; break;
          default: break;
        }    
        return image;
    }    

    const getTrisBonus = () => {
        let message = null;
        let cards = getSelectedCards();
        if(cards.length === 3){
            message = <div className="trisFormula">
                {getImageSource(cards[0])}
                <Typography color={ArmiesTheme["GRAY"].main}>+</Typography>
                {getImageSource(cards[1])}
                <Typography color={ArmiesTheme["GRAY"].main}>+</Typography>
                {getImageSource(cards[2])}
                <Typography color={ArmiesTheme["GRAY"].main}>= {MatchController.trisBonusCalculator(props.player, getSelectedCards(), props.match.map)}</Typography>
            </div>
        }
        return message;
    }
    
    return (
        <div className="place_armies">
            <Typography className="action_panel_title" variant="h6"> Place armies </Typography>
            <Card className="avaiableArmiesCard" sx={{backgroundColor: primaryColor}}>
                <Typography className="avaiableArmiesDescription" variant="caption" color={textColor}>
                    Avaiable armies 
                </Typography> 
                <br/>           
                <Typography className="avaiableArmies" variant="h3" fontWeight="bold" align="center" color={textColor}>
                    {props.player.availableArmies} {" "} <Logo className="logo" color={textColor}/>
                </Typography>  
                <br/>
            </Card>  
            <div className="playCardsDiv">
                <Button className = "playCards" onClick={playCards} variant="outlined" disabled={!(getSelectedCards().length === 3 && MatchController.trisBonusCalculator(props.player, getSelectedCards(), props.match.map) > 0)}>Play cards</Button>
                {getTrisBonus()}    
            </div>    
            <Divider className="control_panel_divider"/>
        </div>
    );  
}

export default PlaceArmies;
