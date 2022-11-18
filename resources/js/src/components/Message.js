import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';

const getCustomStyle = (type) => {
  if (type == "error") return {
    backgroundColor: "#151515",
    fontWeight: "bold",
    cursor: "pointer",
    color:"red",
  }
  if(type=="warning")
  return{
    backgroundColor: "#151515",
    fontWeight: "bold",
    cursor: "pointer",
    color:"yellow",

  }
  else return {
    backgroundColor: "#151515",
    fontWeight: "bold",
    cursor: "pointer",
    color:"#4caf50",
  }
}
const Message = (props) => {
    const [open, setOpen] = React.useState(true);    
    const { type, message } = props;
    return <Alert severity={type}      
      sx={{ mb: 2 }} style={getCustomStyle(type)}>{message}</Alert>;
};

export default Message;
