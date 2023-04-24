import React from "react";
import '../styles/PlayerPreview.css';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function PlayerItem(props) {
  return (
    <ListItem key={props.id}>
        <ListItemAvatar className="avatar">
          <Avatar sx={{ width: 24, height: 24, bgcolor: props.color}}/>
        </ListItemAvatar>
        <ListItemText primary={props.name}/>
    </ListItem>
  );  
}

export default PlayerItem;
