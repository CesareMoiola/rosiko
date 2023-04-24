import { Typography, Card, CardContent, Button, Divider } from "@mui/material";
import React from "react";
import '../styles/GameOver.css';
import { useTheme } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ArmiesTheme } from "../js/armiesPalette";
import apiGateway from "../js/apiGateway";

const GameOver = (props) => {

  const theme = useTheme();

  const getMessage = () => {

    let message = null;

    if(props.variant === "winner"){
      if(props.player.id === props.match.winner.id){
        message = <Typography  variant="h4" color = {theme.palette.primary.contrastText} fontWeight="bold" textAlign="center">You Won !!!<br/><span className="win_emoji" role="img" aria-label="cups">🏆🏆🏆</span></Typography>;
      }
      else{
        message = <Typography  variant="h4" color = {theme.palette.primary.contrastText} fontWeight="bold" textAlign="center">{props.match.winner.name} won<br/><span className="lose_emoji" role="img" aria-label="sad">😭😭😭</span></Typography>;
      }
      
    }

    if(props.variant === "inactive") {
      message = <Typography  variant="h4" color = {theme.palette.primary.contrastText} textAlign="center"> You lose<br/><span className="lose_emoji" role="img" aria-label="sad">😫😫😫</span></Typography>;
    }
    
    if(props.variant === "surrender"){
      message = <Typography  variant="h6" textAlign="center"> Do you surrender?<br/><span className="surrender_emoji" role="img" aria-label="white flag">🏳️🏳️🏳️</span></Typography>;
    }  
    
    return message;
  }

  const getButtons = () => {
    let buttons = <Button 
      className = "right_margin" 
      variant = "outlined"
      color="secondary"
      component={RouterLink} 
      to="/">
      Home
    </Button>;

    if(props.variant === "surrender"){
      buttons = <div>
         <Button 
          className = "margin_right" 
          variant = "outlined"
          color="primary"
          onClick = {() => {apiGateway.surrender(props.match, props.player)}}
          component={RouterLink} 
          to="/">
          Yes
        </Button>
        <Button 
          className = "homeButton" 
          variant = "contained"
          color = "primary"
          onClick = {() => {props.setSurrender(false)}}>
          No
        </Button>
      </div>;
    }

    return buttons;
  }

  const getBackgroundColor = () => {
    let color = "rgba(255,255,255,0.33)";

    if(props.variant === "winner"){color = ArmiesTheme[props.match.winner.color].main;}
    else{
      if(props.variant !== "surrender") color = ArmiesTheme[props.player.color].main;
    }

    return color;
  }

  return(
    <div>
      <Card className="winner" elevation={0} sx={{backgroundColor: getBackgroundColor()}}>
        <CardContent className="winner_card_content">     
          {getMessage()}
          <br/>
          {getButtons()}
        </CardContent>
      </Card>      
      <Divider className="control_panel_divider"/>
    </div>
  );
}

export default GameOver;