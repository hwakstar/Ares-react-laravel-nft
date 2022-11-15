import React from "react";
import { useConnect } from "wagmi";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import WalletListIndex from "./WalletListIndex";
import { connectors } from "../../config/wagmi";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "&": {
    width: "100vw",
    "& .MuiBackdrop-root": {
      backgroundColor: "#000000cc !important",
    },
    "& .MuiPaper-root": {
      maxWidth: "800px !important",
      minWidth: "300px !important",
      maxHeight:"fit-content",
      padding: "5em 1em 1em",
      margin: "0",
      borderRadius: "1px",
      width: "380px",
      height:"100%",
      bottom:"0px",
      right:"0px",
      position:"fixed",
      background: "#141414dd",
      "& h6": {
        fontSize: "16px",
        letterSpacing: "2px",
        
        fontFamily: "Rajdhani",
        color: "#dcb533",
        textAlign: "center",
        marginBottom: "30px",
      },
      "& h1": {
        fontSize: "30px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        fontFamily: "Rajdhani",
        color: "#dcb533",
        textAlign: "center",
        marginBottom: "30px",
      },
      "& .MuiList-root": {
        "& .MuiListItemText-root": {
          "& .MuiTypography-root": {
            color: "#ffffff",
          },
        },
      },
    },
  },
}));

const ConnectWalletModal = (props) => {
  const { changeWalletListModalState } = props;
  const closeModal = () => {
    changeWalletListModalState(false);
  };
  const [open, setOpen] = React.useState(false);

  return (
   
    <CustomDialog  onClose={closeModal} open fullWidth={true}>
       <button onClick={closeModal} className="border glow-on-hover"  style={{width:"100%",backgroundColor:"#141414", color:"#fff", marginTop:"10px",fontWeight:"400",fontSize:"1rem",lineHeight:"2.5",fontFamily:"Roboto"}}>
       Back 
       </button>
    
      <h1 style={{marginTop:"40px"}}>The New world Is Rising</h1>
      <h6>If you don't have a wallet yet,select a provider and create one now.<br/>BE ONE OF US</h6>
      <List className="walletList" >
        {connectors.map((connector) => (
          <WalletListIndex 
            key={`walletList-${connector.connector.id}`}
            connector={connector}
            closeModal={closeModal}
            
          />
        ))}
         </List>
      
    </CustomDialog>
  );
};

export default ConnectWalletModal;
