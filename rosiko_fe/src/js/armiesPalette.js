const ArmiesTheme = {
      RED: {
        main: "#d32f2f",
        light: "#f44336",
        dark: "#b71c1c",
        contrastText: "#ffffff"
      },
      YELLOW: {
        main: "#fbc02d",
        light: "#fdd835",
        dark: "#f9a825",
        contrastText: "#ffffff"
      },
      BLUE: {
        main: "#2196f3",
        light: "#42a5f5",
        dark: "#1976d2",
        contrastText: "#ffffff"
      },
      GREEN: {
        main: "#4caf50",
        light: "#81c784",
        dark: "#388e3c",
        contrastText: "#ffffff"
      },
      PURPLE: {
        main: "#7e57c2",
        light: "#9575cd",
        dark: "#673ab7",
        contrastText: "#ffffff"
      },
      BLACK: {
        main: "#424242",
        light: "#616161",
        dark: "#212121",
        contrastText: "#ffffff"
      },
      GRAY: {
        main: "#e0e0e0",
        light: "#eeeeee",
        dark: "#bdbdbd",
        contrastText: "#000000"
      }
}

function getTheme(color){
  let theme = {
    palette: {
      primary: {
        main: ArmiesTheme[color].main, 
        light: ArmiesTheme[color].light, 
        dark: ArmiesTheme[color].light.dark, 
        contrastText: ArmiesTheme[color].contrastText
      }, 
      secondary: {
        main:"#fafafa", 
        light:"#ffffff", 
        dark: "#eeeeee", 
        contrastText: ArmiesTheme[color].main
      }
    },
    shape: {
      borderRadius: 16
    }
  };

  return theme;
}

export {ArmiesTheme, getTheme};