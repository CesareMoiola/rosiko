import React from "react";
import '../styles/Mission.css';
import { Card, CardContent, Divider, Typography} from "@mui/material";

function Mission(props) {
  return (
    <Card className="mission" elevation={4}>
      <CardContent>
        <Typography className="cardTitle" variant="h6" component="div" fontWeight="bold" align="center">
          Mission
        </Typography>
        <Divider className="mission_divider"/>
        <Typography variant="body2">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );  
}

export default Mission;
