import { useConnect } from "wagmi";
import React, { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import ConnectWalletModal from "./ConnectWalletModal";
import ErrorMessage from "../ErrorMessage";

const ConnectWallet = () => {
    const [modalState, setModalState] = useState(false);
    const { error } = useConnect();

    return (
        <div  className="wallets"  style={{alignItems: "center",display: "flex",flexDirection:"column"}}>
            {error && <ErrorMessage error={error} />}
            <ConnectWalletButton changeWalletListModalState={setModalState} />
            {modalState && (
                <ConnectWalletModal
                    changeWalletListModalState={setModalState}
                />
            )}
        </div>
    );
};

export default ConnectWallet;
