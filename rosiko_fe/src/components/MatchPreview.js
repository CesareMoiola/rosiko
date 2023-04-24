
import React from "react";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import '../styles/MatchPreview.css';

class MatchPreview extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      privateMatch: props.privateMatch,
      matchName: props.matchName,
      players: props.players,
      value: props.value
    }
  }

  render(){
    return(
      <FormControlLabel value={this.state.value} control={<Radio/>} label={
        <div className='matchLabel'>
            <LockIcon 
              className='icon publicMatch' 
              fontSize='small' 
              sx={{visibility: this.state.privateMatch==="true" ? "visible" : "hidden"}}/>
            <label className='matchName'>{this.state.matchName}</label>
            <PersonIcon className='icon personIcon-margin' fontSize='small'/>
            <label>{this.state.players}</label>
        </div>
        }>
      </FormControlLabel>
    )
  }
}

export default MatchPreview;
