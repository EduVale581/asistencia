import React from "react";
import {
    Typography,        
}
    from '@mui/material';



export default function Timer(props) {
  const{hora, minutos} = props;

  const getHora = () =>{    
    if(minutos+15 >= 60){
      return hora+1;
    }
    return hora;
  }

  const getMinutos = () =>{
    var minutosMod = minutos + 15;
    if(minutosMod >= 60 ){
      return minutosMod - 60;
    }
    return minutosMod;
  }

  const getCero = () => {
    if(getMinutos() < 10){
      return 0;
    }
  }

  return (
    <div>
      <Typography>
        La asistencia finalizará a las {getHora()} : {getCero()}{getMinutos()}
      </Typography>
    </div>
  );
}
