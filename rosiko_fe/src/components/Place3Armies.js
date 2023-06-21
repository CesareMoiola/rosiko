import React from "react";
import '../styles/PlaceArmies.css';
import { Typography, Card, Divider } from "@mui/material";
import Logo from "./Logo";
import { useTheme } from '@mui/styles';
import { getPlayerOnDuty } from '../js/matchActions';

function Place3Armies(props) {

    const theme = useTheme();
    let primaryColor = theme.palette.primary.main;
    let textColor = theme.palette.primary.contrastText;

    const getColor = () => {
        let opacity = "99";
        let playerOnDuty = getPlayerOnDuty(props.match)

        if(playerOnDuty.id === props.player.id){ opacity = "ff"; }
        return primaryColor + opacity;
    }
    
    return (
        <div className="place_armies">
            <Typography className="action_panel_title" variant="h6"> Place armies </Typography>
            <Typography className="MediumEmphasis" variant="body2"> 3 per turn </Typography>       
            <Card className="avaiableArmiesCard" sx={{backgroundColor: getColor()}}>
                <Typography className="avaiableArmiesDescription" variant="caption" color={textColor}>
                    Avaiable armies 
                </Typography> 
                <br/>       
                <div className="armies_cards">
                    <Typography className="avaiableArmies" variant="h3" fontWeight="bold" align="center" color={textColor}>
                        {props.player.availableArmies}
                    </Typography>  
                    <Logo className="logo" color={textColor}/>
                </div>    
                <br/>
            </Card>            
            <Divider className="control_panel_divider"/>           
        </div>
    );  
}

export default Place3Armies;
