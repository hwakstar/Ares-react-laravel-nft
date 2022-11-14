import React, { useEffect } from "react";
import {
    useAccount,
    useDisconnect,
  } from 'wagmi'
import { reduceAddress } from "../../utils/common";

const customStyle = {
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
   
}

const ConnectWalletButton = (props) => {
    const { changeWalletListModalState } = props;
    const { address, isConnected } = useAccount()
    const { disconnect, isSuccess } = useDisconnect()
    const openWalletListModal = () => {
        changeWalletListModalState(true);
    };

    useEffect(() => {
        localStorage.setItem("ares-connected-wallet", "")
    }, [isSuccess])

    const handleDisconnect = () => {
        console.log("disconnect")
        disconnect()
    }
    return (
        <>
            {isConnected ? (
                <button className="btn-fi img-fluid" onClick={handleDisconnect} style={{margin:"11px"}}><span class="btn-fi-line"></span>{reduceAddress(address)}</button>
            ) : (
                <button className="btn-fi img-fluid" onClick={openWalletListModal} style={{margin:"15px"}}><span class="btn-fi-line"></span>Connect your Wallet</button>
            )}
        </>
    );
};

export default ConnectWalletButton;