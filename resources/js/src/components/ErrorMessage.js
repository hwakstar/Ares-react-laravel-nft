import React from "react";
import Alert from "@mui/material/Alert";

const ErrorMessage = (props) => {
    const { error } = props;
    return <Alert severity="error">{error.message}</Alert>;
};

export default ErrorMessage;
