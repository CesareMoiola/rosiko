import React, {useState, useEffect} from "react";

const path_1 = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,13.5c-0.8,0-1.5-0.7-1.5-1.5 s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S12.8,13.5,12,13.5z" />;
const path_2 = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7.5,9C6.7,9,6,8.3,6,7.5 S6.7,6,7.5,6S9,6.7,9,7.5S8.3,9,7.5,9z M16.5,18c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S17.3,18,16.5,18z" />;
const path_3 = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7.5,9C6.7,9,6,8.3,6,7.5 S6.7,6,7.5,6S9,6.7,9,7.5S8.3,9,7.5,9z M12,13.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S12.8,13.5,12,13.5z M16.5,18c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S17.3,18,16.5,18z" />;
const path_4 = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7.5,18C6.7,18,6,17.3,6,16.5 S6.7,15,7.5,15S9,15.7,9,16.5S8.3,18,7.5,18z M7.5,9C6.7,9,6,8.3,6,7.5S6.7,6,7.5,6S9,6.7,9,7.5S8.3,9,7.5,9z M16.5,18 c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S17.3,18,16.5,18z M16.5,9C15.7,9,15,8.3,15,7.5S15.7,6,16.5,6	S18,6.7,18,7.5S17.3,9,16.5,9z" />;
const path_5 = <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.8 0-1.5-.7-1.5-1.5S6.7 15 7.5 15s1.5.7 1.5 1.5S8.3 18 7.5 18zm0-9C6.7 9 6 8.3 6 7.5S6.7 6 7.5 6 9 6.7 9 7.5 8.3 9 7.5 9zm4.5 4.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm4.5 4.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm0-9c-.8 0-1.5-.7-1.5-1.5S15.7 6 16.5 6s1.5.7 1.5 1.5S17.3 9 16.5 9z" />;
const path_6 = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7.5,18C6.7,18,6,17.3,6,16.5 S6.7,15,7.5,15S9,15.7,9,16.5S8.3,18,7.5,18z M7.5,13.5C6.7,13.5,6,12.8,6,12s0.7-1.5,1.5-1.5S9,11.2,9,12S8.3,13.5,7.5,13.5z M7.5,9C6.7,9,6,8.3,6,7.5S6.7,6,7.5,6S9,6.7,9,7.5S8.3,9,7.5,9z M16.5,18c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5 S17.3,18,16.5,18z M16.5,13.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S18,11.2,18,12S17.3,13.5,16.5,13.5z M16.5,9 C15.7,9,15,8.3,15,7.5S15.7,6,16.5,6S18,6.7,18,7.5S17.3,9,16.5,9z" />;
const path_add = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13 z" />;
const path_remove = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M16.2,14.8l-1.4,1.4L12,13.4 l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z" />;
const path_none = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z" />;
const path_rolling = <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M16.2,14.8l-1.4,1.4L12,13.4 l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z" />;

const Dice = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(()=>{
    let diceValue = props.value;

    if(props.isRolling && diceValue!=="none" && diceValue!=="remove" && diceValue!=="add"){
      const interval = setInterval(() => {
        setValue((Math.floor(Math.random() * 6) +1) + "");
      }, 100);
    
      return () => clearInterval(interval);
    }    
    else setValue(props.value);
  }, [props])

  //if(props.isRolling === true){ setValue((Math.floor(Math.random() * 6) +1) + "")}

  const getPath = () => {    
    let path = null;   

    switch(value){
      case "1": path = path_1; break;
      case "2": path = path_2; break;
      case "3": path = path_3; break;
      case "4": path = path_4; break;
      case "5": path = path_5; break;
      case "6": path = path_6; break;
      case "add": path = path_add; break;
      case "remove": path = path_remove; break;
      case "none": path = path_none; break;
      case "rolling": path = path_rolling; break;
      default: break;
    }

    return path;
  }

  const getOpacity = () => {
    let opacity = 1;
    if(props.value === "add" || props.value === "remove" || props.win === false){
      opacity = 0.5;
    }
    if(props.value === "none"){
      opacity = 0.25;
    }
    return opacity;
  }

  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        enableBackground: "new 0 0 24 24",
        opacity: getOpacity()
      }}
      xmlSpace="preserve"
      {...props}
    >
      {getPath()}
    </svg>
  );
}

export {Dice}