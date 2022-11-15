import React from "react";
import Alert from "@mui/material/Alert";

const Message = (props) => {
    const { type, message } = props;
    return <Alert severity={type}>{message}</Alert>;
};

export default Message;
