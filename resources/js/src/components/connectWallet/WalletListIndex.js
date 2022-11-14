import React, { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircularProgress from "@mui/material/CircularProgress";

const WalletListIndex = (props) => {
  const { connector, closeModal } = props;
  const { isLoading, pendingConnector, connect } = useConnect();
  const chooseWallet = async () => {
    connect({ connector: connector.connector });
    closeModal();
  };

  return (
    <ListItem
      className="item border glow-on-hover"
      onClick={() => chooseWallet()}
      disabled={!connector.connector.ready}
      style={{height:"80px"}}
    >
      <ListItemIcon className="symbol">
        {isLoading && connector.connector.id === pendingConnector?.id ? (
          <CircularProgress />
        ) : (
          <img width={40} src={connector.logo} alt={connector.connector.name} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={connector.connector.name}
        secondary={!connector.connector.ready ? "(Unsupported)" : ""}
        sx={{ cursor: "default" }}
      />
    </ListItem>
  );
};

export default WalletListIndex;
