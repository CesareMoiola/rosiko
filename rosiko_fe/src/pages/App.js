import Home from './Home.js';
import NewMatch from './NewMatch.js';
import '../styles/App.css';
import {Route, Routes} from 'react-router-dom';
import WaitingRoom from './WaitingRoom.js';
import Match from './Match.js';
import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JoinMatch from './JoinMatch.js';
import Logo from '../components/Logo';
/*import home_background from '../images/globe.svg';*/

const theme = createTheme(
  {
    palette: {
      primary: {
        main:"#212121", 
        light:"#616161", 
        dark: "black", 
        contrastText: "white"
      },
      secondary: {
        main:"#fafafa", 
        light:"#ffffff", 
        dark: "#eeeeee", 
        contrastText: "black"
      }
    },
    shape: {
      borderRadius: 16
    }
  }
);

function App() {
  /*style={{ backgroundImage: `url(${home_background})`}}*/
  return (
    <div className="App" style={{ backgroundColor:"#e0e0e0"}}>
      <ThemeProvider theme = {theme}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new_match" element={<NewMatch/>}/>
          <Route path="/join_match" element={<JoinMatch/>}/>
          <Route path="/waiting_room/:id" element={<WaitingRoom/>}/>
          <Route path="/Match/:id" element={<Match/>}/>
        </Routes>   
      </ThemeProvider>    
    </div>
  );
}

export default App;
