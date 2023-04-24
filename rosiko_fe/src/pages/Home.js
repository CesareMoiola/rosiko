import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/Home.css';
import React from 'react';

function Home() {
  return (
    <div className="home">
      <div className="menu">
        <Typography className='home-title' variant='h1' style={{fontWeight: "bold"}}>Rosiko</Typography>
          <div className="home-buttons-container">          
            <Button className="home-button" 
              variant="outlined"  
              component={RouterLink}
              to="/new_match">New match</Button>
            <br/>
            <Button 
              className="home-button" 
              variant="contained" 
              component={RouterLink}
              to="/join_match">Join match</Button>
          </div>
      </div>
    </div>
  );
}

export default Home;
