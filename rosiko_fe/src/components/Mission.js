import React from "react";
import '../styles/Mission.css';
import { Card, CardContent, Divider, Typography} from "@mui/material";

function Mission(props) {

  const getDescription = () => {
    let mission = props.mission;
    let description = '';

    if( mission !== null && mission !== undefined){
      description = mission.description;
    }

    return description;
  }

  return (
    <Card className="mission" elevation={4}>
      <CardContent>
        <Typography className="cardTitle" variant="h6" component="div" fontWeight="bold" align="center">
          Mission
        </Typography>
        <Divider className="mission_divider"/>
        <Typography variant="body2">
          {getDescription()}
        </Typography>
      </CardContent>
    </Card>
  );  
}

export default Mission;
