import image1 from "./images/content/aresnft-coming-soon-gold.svg";
import image2 from "./images/content/businessman-hold-cubic-of-business-financial-and-banking-concept-digital-marketing-network-Recovered.1png.png";
import image3 from "./images/content/ares-edition.png";
import image4 from "./images/content/logo-project-item-nft.svg";
import image5 from "./images/content/logo-project-item-invest.svg";
import image6 from "./images/content/logo-project-item-edition.svg";
import image7 from "./images/content/logo-section.svg";
import man1 from "./images/content/ares-nft-slider-2.png";
import man2 from "./images/content/ares-nft-slider-1.png";
import man3 from "./images/content/ares-nft-slider-3.png";
import man4 from "./images/content/ares-nft-slider-4.png";
import svg from "./images/content/ares-nft-title.svg";
import Footer from "./components/Footer";
import logo from "./images/content/logo.svg";
import modaltilte from "./images/content/mint-your-ares-nft-title.svg";
import nft1 from "./images/content/mint-your-ares-nft-1.png";
import nftshape from "./images/content/mint-your-ares-nft-shape.png";

import slider2 from "./images/content/ares-nft-slider-1.png";
import slider1 from "./images/content/ares-nft-slider-2.png";
import slider3 from "./images/content/ares-nft-slider-3.png";
import slider4 from "./images/content/ares-nft-slider-4.png";
import Header from "./components/Header";
import React, {useState, useEffect, useCallback} from "react";
import ConnectWalletModal from "./components/connectWallet/ConnectWalletModal";
import {useAccount, useSigner} from "wagmi";
import Snackbar from '@mui/material/Snackbar';
import {getContractData, getUserData, mint, getTransactionState} from "./utils/web3Utils";
import {BSC_TESTNET_PROVIDER} from "./config/constants";
import {CONTRACT_STATE, PUBLIC_ALLOWANCE, WHITELIST_ALLOWANCE} from "./config/constants";
import Message from "./components/Message";
import Alert from '@mui/material/Alert';
// import whitelist from "./images/whitelist.jpg";
// import CookieConsent from "react-cookie-consent";
export default function Dashboard() {
    const [counter, setCounter] = useState(0);

    // increase counter


    const [count, setcount] = useState(0);
    const [warnadd, setwarnadd] = useState(undefined);
    const [modalState, setModalState] = useState(false);
    const [mintAmount, setMintAmount] = useState(1);
    const [userData, setUserData] = useState(undefined);
    const [contractState, setContractState] = useState(0);
    const [remainTime, setRemainTime] = useState(0);
    const [counters, setCounters] = useState(0);
    const [message, setMessage] = useState(undefined);
    const {address, isConnected} = useAccount();
    const {data: signer} = useSigner();
    const [open, setOpen] = useState(false);
    const [currentPhase,setCurrentPhase]=useState();
    const [alertMessage, setAlertMessage] = useState({
        status: "success",
        message: ""
    })
    const handleUserData = useCallback(async () => {
        const {status, _whiteListed, _userBalance, _userPhaseBalance} = await getUserData(address, signer);

        if (status) {
            setUserData({whiteListed: _whiteListed, balance: Number(_userBalance), phaseBalance: Number(_userPhaseBalance)});
        }
    }, [address, signer]);
    const handleContractData = useCallback(async () => {
        const {status, _contractState, _remainTime,_currentPhase} = await getContractData();
        if (status && _remainTime > 0 && counters == 0) {
            setRemainTime(_remainTime);
        }
        setContractState(_contractState);
        setCurrentPhase(_currentPhase);
    });
    useEffect(() => {
       
        if (!address || !signer) 
            return;
        


        handleUserData(address, signer);
        const timer = setInterval(() => {
            handleUserData(address, signer);
        }, 15000);
        return() => {
            clearInterval(timer);
        };
    }, [address, signer, handleUserData]);
    useEffect(() => {
        handleContractData();
        const timer1 = setInterval(() => {
            handleContractData();
        }, 15000);
        return() => {
            clearInterval(timer1);
        };
    }, [handleContractData]);
    const connectWallet = () => {
        setModalState(true);
    };
    const mintableTokens = userData ? userData.whiteListed && contractState == 1 ? WHITELIST_ALLOWANCE - userData.phaseBalance : (contractState > 1 ? PUBLIC_ALLOWANCE - userData.phaseBalance : 0) : 0;


    const fetchTransactionState = async (hash) => {
        const state = await getTransactionState(hash)
        if (state == "success") {
           
            setAlertMessage({
                status: "success",
                message: "Mint NFTs are successfully confirmed"
            })
            setOpen(true)
        if (address && signer)  handleUserData(address, signer)
        } else if (state == "failed") {
            setAlertMessage({
                status: "error",
                message: "Mint failed"
            })
            setOpen(true)
        } else if (state == "pending") {
            setTimeout(() => {
                fetchTransactionState(hash)
            }, 1000)
        }
    }

    useEffect(() => {
        if (userData?.phaseBalance > 0) setMessage({type: "success", message: `You already minted ${userData.phaseBalance} NFTs`})
}, [userData])

    const handleMint = async () => { 
        if (contractState == CONTRACT_STATE.OFF) {
            setMessage({type: "error", message: "Mint has not started"});
            return;
        }
        if (userData && !userData.whiteListed && contractState == CONTRACT_STATE.WHITELIST) {
            setMessage({type: "error", message: "You are not a whitelisted member"});
            return;
        }
        if (userData && userData.whiteListed && contractState > CONTRACT_STATE.WHITELIST && userData?.phaseBalance == 0) {
            setMessage({type: "warning", message: "whitlisted mint is closed"});
        }
           let result;
        if (userData && userData.whiteListed && mintableTokens > 0 && contractState === CONTRACT_STATE.WHITELIST) {
            result = await mint(mintAmount, address, signer, CONTRACT_STATE.WHITELIST);
        }
        if (userData && mintableTokens > 0 && contractState === CONTRACT_STATE.PRESALE) {
            result = await mint(mintAmount, address, signer, CONTRACT_STATE.PRESALE);
        }
        if (userData && mintableTokens > 0 && contractState === CONTRACT_STATE.PUBLIC) {
            result = await mint(mintAmount, address, signer, CONTRACT_STATE.PUBLIC);
        }


        if (result && result.status) {
            fetchTransactionState(result.hash)
        } else {
            setAlertMessage({
                status: "error",
                message: "Mint failed"
            })
            setOpen(true)
        }

    };
    const addAmount = () => {
       

        if (mintAmount >= mintableTokens) {
            return;
        }

        if (contractState === CONTRACT_STATE.WHITELIST) {
          
            if (mintAmount < 3) {
                setMintAmount(mintAmount + 1);
                if (mintAmount == 2) 
                    setwarnadd("you cannot mint more than 3 nfts ");
                


            } else {}
        } else if (contractState === CONTRACT_STATE.PRESALE || contractState === CONTRACT_STATE.PUBLIC) {
            if (mintAmount < 2) {
                setMintAmount(mintAmount + 1);
                setwarnadd("you cannot mint more than 2 nfts ");
            } else {
                setwarnadd("you cannot mint more than 2 nfts ");
            }
        }


    };
    const reduceAmount = () => {
        if (mintAmount === 1) 
            return;
        


        setMintAmount(mintAmount - 1);
        if (contractState === CONTRACT_STATE.PRESALE || contractState === CONTRACT_STATE.PUBLIC) {
            if (mintAmount == 2) {
                setwarnadd(undefined);
            }
        }
        if (mintAmount == 3) {
            setwarnadd(undefined);
        }
    };


    useEffect(() => {
        if (remainTime > 0) 
            setCounters(remainTime)

        
        


        const interval = setInterval(() => {
            setCounters((prevCounter) => prevCounter > 0 ? prevCounter - 1 : 0);


        }, 1000);

        return() => clearInterval(interval);
    }, [remainTime]);


    const handleClick = () => {
        setOpen(true);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
  
    if(contractState==CONTRACT_STATE.OFF || contractState == CONTRACT_STATE.PUBLIC)
    {
        
    }

 console.log(currentPhase)

    return (
        <> {
            modalState && (
                <ConnectWalletModal changeWalletListModalState={setModalState}/>
            )
        }

            {/* <CookieConsent
             location="bottom"
            buttonText="Sure!!"
            cookieName="myAwesomeCookieName2"
             style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
             expires={150}
>
  This website uses cookies to enhance the user experience.{" "}
  <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
        </CookieConsent> */}

            <div className="loading loading-homepage">
                <div className="loading-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="232.842" height="206.68" viewBox="0 0 232.842 206.68">
                        <defs>
                            <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
                                <stop offset="0" stopColor="#edd32e"/>
                                <stop offset="1" stopColor="#e4b300"/>
                            </linearGradient>
                        </defs>
                        <g id="logo-preloader" transform="translate(8399.684 -7048.87)">
                            <g id="logo-preloader-fill" transform="translate(-8399 7049)">
                                <path id="text" d="M18.261,984.073a2.71,2.71,0,0,1-.42,1.775,2.021,2.021,0,0,1-1.529.458H11.629a2.021,2.021,0,0,1-1.529-.458,2.723,2.723,0,0,1-.42-1.775v-4.98a2.709,2.709,0,0,1,.42-1.775,2.041,2.041,0,0,1,1.529-.458h4.684q1.4,0,1.735.787a7.491,7.491,0,0,1,.214,2.344l-1.815.347v-1.793h-4.94v5.987h4.93V982.5l1.815.458Z" transform="translate(-7.728 -779.819)" fill="#e4b300"/>
                                <path id="text-2" data-name="text" d="M126.524,984.073a2.72,2.72,0,0,1-.418,1.775,2.025,2.025,0,0,1-1.529.458H118.8a2.021,2.021,0,0,1-1.529-.458,2.725,2.725,0,0,1-.418-1.775v-4.98a2.719,2.719,0,0,1,.418-1.775,2.037,2.037,0,0,1,1.529-.458h5.781a2.033,2.033,0,0,1,1.529.458,2.708,2.708,0,0,1,.418,1.775Zm-1.825.458v-5.987h-6.023v5.987Z" transform="translate(-93.28 -779.819)" fill="#e4b300"/>
                                <path id="text-3" data-name="text" d="M239.959,986.306h-2.622l-3.157-3.568h-1.735v3.57h-1.8V976.86h6.727q1.765,0,1.765,1.829v2.219q0,1.374-.912,1.7a7.868,7.868,0,0,1-1.888.127Zm-2.582-5.932V979.24c0-.319-.075-.524-.228-.623a1.007,1.007,0,0,0-.593-.127h-4.111v2.634h4.107a1.008,1.008,0,0,0,.593-.129C237.3,980.9,237.377,980.693,237.377,980.374Z" transform="translate(-184.334 -779.819)" fill="#e4b300"/>
                                <path id="text-4" data-name="text" d="M346.384,980.8q0,1.83-1.765,1.832h-4.934v3.679h-1.8V976.86h6.723q1.765,0,1.765,1.829Zm-1.765-.549v-1.008c0-.319-.075-.525-.228-.623a1.008,1.008,0,0,0-.593-.127h-4.113v2.507h4.107a1.008,1.008,0,0,0,.593-.127c.153-.1.228-.3.228-.621Z" transform="translate(-270.038 -779.819)" fill="#e4b300"/>
                                <path id="text-5" data-name="text" d="M449.524,984.073a2.719,2.719,0,0,1-.418,1.775,2.022,2.022,0,0,1-1.529.458H441.8a2.025,2.025,0,0,1-1.529-.458,2.712,2.712,0,0,1-.418-1.775v-4.98a2.719,2.719,0,0,1,.418-1.775,2.033,2.033,0,0,1,1.529-.458h5.781a2.029,2.029,0,0,1,1.529.458,2.707,2.707,0,0,1,.418,1.775Zm-1.826.458v-5.987h-6.023v5.987Z" transform="translate(-351.526 -779.819)" fill="#e4b300"/>
                                <path id="text-6" data-name="text" d="M562.961,986.306h-2.622l-3.159-3.568h-1.735v3.57h-1.8V976.86h6.727q1.765,0,1.763,1.829v2.219q0,1.374-.912,1.7a7.854,7.854,0,0,1-1.886.127Zm-2.584-5.932V979.24a.693.693,0,0,0-.23-.623,1.008,1.008,0,0,0-.593-.127h-4.109v2.634h4.107a1.008,1.008,0,0,0,.593-.129Q560.377,980.852,560.377,980.374Z" transform="translate(-442.473 -779.819)" fill="#e4b300"/>
                                <path id="text-7" data-name="text" d="M661.349,986.306H659.3l-.944-2.068h-4.974l-.912,2.068H650.64l4.438-9.446h1.765Zm-3.758-3.77-1.688-3.847-1.749,3.847Z" transform="translate(-519.991 -779.819)" fill="#e4b300"/>
                                <path id="text-8" data-name="text" d="M758.047,978.544h-3.631v7.762H752.6v-7.762H749V976.86h9.051Z" transform="translate(-598.596 -779.819)" fill="#e4b300"/>
                                <path id="text-9" data-name="text" d="M853.555,986.306H851.74V976.86h1.815Z" transform="translate(-680.68 -779.819)" fill="#e4b300"/>
                                <path id="text-10" data-name="text" d="M936.256,984.073a2.719,2.719,0,0,1-.42,1.775,2.03,2.03,0,0,1-1.529.458h-5.781a2.016,2.016,0,0,1-1.527-.458,2.723,2.723,0,0,1-.42-1.775v-4.98a2.709,2.709,0,0,1,.42-1.775,2.037,2.037,0,0,1,1.527-.458h5.781a2.029,2.029,0,0,1,1.529.458,2.719,2.719,0,0,1,.42,1.775Zm-1.815.458v-5.987h-6.035v5.987Z" transform="translate(-740.681 -779.819)" fill="#e4b300"/>
                                <path id="text-11" data-name="text" d="M1049.542,986.306H1048.3l-5.765-5.85a6.274,6.274,0,0,1-.656-.769c.052.605.077,1.091.077,1.446V986.3h-1.642V976.86h1.246l5.523,5.565a9.688,9.688,0,0,1,.9,1.025c-.052-.877-.077-1.412-.077-1.628V976.86h1.642Z" transform="translate(-831.471 -779.819)" fill="#e4b300"/>
                                <path id="title" d="M45.383,21.847v-5.46H13.621v10.92l-4.542-5.46v-5.46H4.544L0,10.927H45.383V5.467H4.544L0,0H45.383A4.061,4.061,0,0,1,48.6,1.608a5.838,5.838,0,0,1,1.329,3.859v5.46A5.815,5.815,0,0,1,48.6,14.786a4.033,4.033,0,0,1-3.206,1.6h4.531v10.92Z" transform="translate(60.075 162.666)" fill="#e4b300"/>
                                <path id="title-2" data-name="title" d="M617.869,811.906l4.538-5.466H577.031a4.022,4.022,0,0,0-3.207,1.614,5.816,5.816,0,0,0-1.331,3.859v16.381a5.85,5.85,0,0,0,1.331,3.861,4.022,4.022,0,0,0,3.207,1.6h40.838l4.546-5.466H577.031v-5.46h18.154l4.536-5.46h-22.69v-5.46Z" transform="translate(-457.645 -643.774)" fill="#e4b300"/>
                                <path id="title-3" data-name="title" d="M893.63,817.367h-40.84v-5.46h40.84l4.538-5.466H852.784a4.025,4.025,0,0,0-3.207,1.614,5.815,5.815,0,0,0-1.331,3.859v5.46a5.849,5.849,0,0,0,1.331,3.861,4.022,4.022,0,0,0,3.207,1.6h40.84v5.46H848.24l4.538,5.46h40.84a4.039,4.039,0,0,0,3.209-1.6,5.833,5.833,0,0,0,1.329-3.861v-5.466a5.85,5.85,0,0,0-1.329-3.859A4.015,4.015,0,0,0,893.63,817.367Z" transform="translate(-678.143 -643.774)" fill="#e4b300"/>
                                <path id="title-4" data-name="title" d="M0,831.923H8.036l38.877-25.274h1.136v7.814H45.56L38.9,820.055l9.154.04v11.828H54.6V802.71H45.689Z" transform="translate(0 -640.796)" fill="#e4b300"/>
                                <path id="shape" d="M355.089,121.673l-14.228-20.213,5.515-40.947.109-.807-.506-.605L295.271,0l47.373,60.775L337.98,95.408l-46-65.7-.892-1.388-.022-.034L246.83,93.552l-5.507-32.806L288.223.555,237.969,59.1l-.533.617.143.843,6.574,39.174-15.3,21.946-1.192,1.712,1.815.932,54.491,28.239-50.994-30.4L245.9,103.622,285.938,139l.161-4.611L274.162,123.8h0L249.68,102.064l18.45-27.11,1.228,17.607.016-.23,1.493-21.381h-.012l2.6-3.832,14.65-21.526,2.941,42.115.038-.557L294.006,45.3l16.625,23.634,1.458,2.074,1.5,21.559.016-.23L314.82,74.9l19.9,28.3L299.95,133.507c-.04-3.49-.087-7.292-.111-7.806q-.139-2.644-.325-5.281l-.2-2.636-.226-2.634-.022-.3-.2-.351-1.317-2.34c-.434-.783-.89-1.553-1.335-2.328s-.894-1.551-1.352-2.32l-1.374-2.31-1.517-2.56-.127-.216-1.533,2.838-1.251,2.318c-.413.771-.817,1.539-1.22,2.326s-.823,1.549-1.21,2.334l-1.21,2.344-.169.329-.032.258-.226,2.622c-.073.877-.133,1.755-.2,2.632q-.192,2.622-.323,5.273c-.034.674-.062,4.1-.089,7.155l1.716,1.523c.2-3.389,1.241-11.865,1.547-13.6.149-.869.307-1.735.448-2.6l.365-2.237,1.2-2.037c.448-.756.871-1.525,1.307-2.287.343-.605.682-1.194,1.009-1.8l.018-.032q.571.94,1.158,1.876c.474.758.938,1.523,1.424,2.275l1.285,2.017.359,2.207.448,2.606c.309,1.735,1.71,14.926,1.934,18.47l1.4-.922,38.641-33.669,12.326,17.514-50.97,30.391,54.491-28.239,1.815-.938Z" transform="translate(-182.18)" fill="url(#linear-gradient)"/>
                                <path id="shape-2" data-name="shape" d="M1111.182,810.211a4.571,4.571,0,1,0,0,3.559,4.609,4.609,0,0,0,0-3.568ZM1106.959,816a4.008,4.008,0,1,1,4.013-4.006A4.008,4.008,0,0,1,1106.959,816Z" transform="translate(-879.542 -644.869)" fill="#e4b300"/>
                                <path id="shape-3" data-name="shape" d="M1118.438,819.361a1.9,1.9,0,0,0-.524-.734,1.39,1.39,0,0,0,.752-1.29,1.338,1.338,0,0,0-.576-1.13,2.525,2.525,0,0,0-1.5-.407,7.877,7.877,0,0,0-1.4.142l-.079.014v5.226h.879v-2.235h.759c.635,0,1.048.725,1.234,2.151v.084h.87l-.016-.111A7.62,7.62,0,0,0,1118.438,819.361Zm-.881-1.378a1.428,1.428,0,0,1-.852.208h-.716v-1.582c.167-.016.371-.023.61-.023.829,0,1.231.26,1.231.8a.7.7,0,0,1-.273.6Z" transform="translate(-889.303 -651.359)" fill="#e4b300"/>
                            </g>
                            <g id="logo-preloader-stroke" transform="translate(-8399.5 7049)">
                                <path id="text" data-name="text" d="M18.234,984.051a2.7,2.7,0,0,1-.418,1.77,2.015,2.015,0,0,1-1.524.456H11.622a2.015,2.015,0,0,1-1.524-.456,2.714,2.714,0,0,1-.418-1.77v-4.965a2.7,2.7,0,0,1,.418-1.77,2.035,2.035,0,0,1,1.524-.456h4.669q1.4,0,1.729.784a7.468,7.468,0,0,1,.213,2.337l-1.81.346v-1.788H11.5v5.968h4.914V982.48l1.81.456Z" transform="translate(-7.18 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M126.494,984.051a2.711,2.711,0,0,1-.416,1.77,2.018,2.018,0,0,1-1.524.456H118.79a2.015,2.015,0,0,1-1.524-.456,2.716,2.716,0,0,1-.416-1.77v-4.965a2.711,2.711,0,0,1,.416-1.77,2.03,2.03,0,0,1,1.524-.456h5.763a2.026,2.026,0,0,1,1.524.456,2.7,2.7,0,0,1,.416,1.77Zm-1.82.456v-5.968h-6v5.968Z" transform="translate(-92.85 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M239.93,986.277h-2.614l-3.147-3.557H232.44v3.559h-1.79V976.86h6.706q1.759,0,1.759,1.824V980.9q0,1.369-.909,1.7a7.842,7.842,0,0,1-1.882.127Zm-2.574-5.914v-1.13c0-.318-.074-.523-.227-.621a1,1,0,0,0-.591-.127h-4.1v2.626h4.094a1,1,0,0,0,.591-.129C237.278,980.888,237.356,980.681,237.356,980.363Z" transform="translate(-183.65 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M346.358,980.783q0,1.824-1.759,1.826H339.68v3.668h-1.79V976.86h6.7q1.76,0,1.76,1.824Zm-1.759-.547v-1.005c0-.318-.074-.523-.227-.621a1,1,0,0,0-.591-.127h-4.1v2.5h4.094a1.006,1.006,0,0,0,.591-.127c.153-.1.227-.3.227-.619Z" transform="translate(-269.389 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M449.494,984.051a2.711,2.711,0,0,1-.416,1.77,2.015,2.015,0,0,1-1.524.456H441.79a2.018,2.018,0,0,1-1.524-.456,2.7,2.7,0,0,1-.416-1.77v-4.965a2.711,2.711,0,0,1,.416-1.77,2.026,2.026,0,0,1,1.524-.456h5.763a2.023,2.023,0,0,1,1.524.456,2.7,2.7,0,0,1,.416,1.77Zm-1.82.456v-5.968h-6v5.968Z" transform="translate(-350.85 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M562.932,986.277h-2.614l-3.149-3.557H555.44v3.559h-1.79V976.86h6.706q1.759,0,1.757,1.824V980.9q0,1.369-.909,1.7a7.828,7.828,0,0,1-1.88.127Zm-2.576-5.914v-1.13a.691.691,0,0,0-.229-.621,1,1,0,0,0-.591-.127h-4.1v2.626h4.094a1,1,0,0,0,.591-.129Q560.356,980.839,560.356,980.363Z" transform="translate(-442.15 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M661.315,986.277h-2.047l-.941-2.061h-4.959l-.909,2.061h-1.82l4.424-9.417h1.759Zm-3.746-3.758-1.683-3.835-1.743,3.835Z" transform="translate(-519.34 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M758.018,978.539H754.4v7.738h-1.81v-7.738H749V976.86h9.022Z" transform="translate(-598.09 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M853.55,986.277h-1.81V976.86h1.81Z" transform="translate(-680.24 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M936.226,984.051a2.71,2.71,0,0,1-.418,1.77,2.023,2.023,0,0,1-1.524.456H928.52A2.01,2.01,0,0,1,927,985.82a2.714,2.714,0,0,1-.418-1.77v-4.965a2.7,2.7,0,0,1,.418-1.77,2.031,2.031,0,0,1,1.522-.456h5.763a2.023,2.023,0,0,1,1.524.456,2.71,2.71,0,0,1,.418,1.77Zm-1.81.456v-5.968H928.4v5.968Z" transform="translate(-740.261 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="text" data-name="text" d="M1049.513,986.277h-1.243l-5.747-5.831a6.255,6.255,0,0,1-.654-.766c.052.6.076,1.088.076,1.442v5.146h-1.637V976.86h1.242l5.506,5.548a9.66,9.66,0,0,1,.895,1.021c-.052-.875-.076-1.407-.076-1.623V976.86h1.637Z" transform="translate(-831.122 -779.928)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="title" data-name="title" d="M45.242,21.779V16.336H13.579V27.222L9.052,21.779V16.336H4.53L0,10.893H45.242V5.45H4.53L0,0H45.242a4.049,4.049,0,0,1,3.206,1.6A5.822,5.822,0,0,1,49.773,5.45v5.443a5.8,5.8,0,0,1-1.328,3.847,4.021,4.021,0,0,1-3.2,1.6h4.518V27.222Z" transform="translate(60.5 162.663)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="title" data-name="title" d="M617.728,811.889l4.524-5.449H577.016a4.009,4.009,0,0,0-3.2,1.609,5.8,5.8,0,0,0-1.327,3.847v16.33a5.831,5.831,0,0,0,1.327,3.849,4.01,4.01,0,0,0,3.2,1.595h40.711l4.532-5.449H577.016v-5.443h18.1l4.522-5.443h-22.62v-5.443Z" transform="translate(-457.372 -643.777)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="title" data-name="title" d="M893.489,817.333H852.776v-5.443h40.713l4.524-5.449H852.77a4.013,4.013,0,0,0-3.2,1.609,5.8,5.8,0,0,0-1.327,3.847v5.443a5.831,5.831,0,0,0,1.327,3.849,4.01,4.01,0,0,0,3.2,1.595h40.713v5.443H848.24l4.524,5.443h40.713a4.027,4.027,0,0,0,3.2-1.595A5.815,5.815,0,0,0,898,828.225v-5.449a5.832,5.832,0,0,0-1.325-3.847A4,4,0,0,0,893.489,817.333Z" transform="translate(-677.674 -643.777)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="title" data-name="title" d="M0,831.833H8.011l38.757-25.2H47.9v7.79H45.418L38.775,820l9.125.04v11.791h6.531V802.71H45.547Z" transform="translate(0.5 -640.796)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="shape" data-name="shape" d="M355.089,121.673l-14.228-20.213,5.515-40.947.109-.807-.506-.605L295.271,0l47.373,60.775L337.98,95.408l-46-65.7-.892-1.388-.022-.034L246.83,93.552l-5.507-32.806L288.223.555,237.969,59.1l-.533.617.143.843,6.574,39.174-15.3,21.946-1.192,1.712,1.815.932,54.491,28.239-50.994-30.4L245.9,103.622,285.938,139l.161-4.611L274.162,123.8h0L249.68,102.064l18.45-27.11,1.228,17.607.016-.23,1.493-21.381h-.012l2.6-3.832,14.65-21.526,2.941,42.115.038-.557L294.006,45.3l16.625,23.634,1.458,2.074,1.5,21.559.016-.23L314.82,74.9l19.9,28.3L299.95,133.507c-.04-3.49-.087-7.292-.111-7.806q-.139-2.644-.325-5.281l-.2-2.636-.226-2.634-.022-.3-.2-.351-1.317-2.34c-.434-.783-.89-1.553-1.335-2.328s-.894-1.551-1.352-2.32l-1.374-2.31-1.517-2.56-.127-.216-1.533,2.838-1.251,2.318c-.413.771-.817,1.539-1.22,2.326s-.823,1.549-1.21,2.334l-1.21,2.344-.169.329-.032.258-.226,2.622c-.073.877-.133,1.755-.2,2.632q-.192,2.622-.323,5.273c-.034.674-.062,4.1-.089,7.155l1.716,1.523c.2-3.389,1.241-11.865,1.547-13.6.149-.869.307-1.735.448-2.6l.365-2.237,1.2-2.037c.448-.756.871-1.525,1.307-2.287.343-.605.682-1.194,1.009-1.8l.018-.032q.571.94,1.158,1.876c.474.758.938,1.523,1.424,2.275l1.285,2.017.359,2.207.448,2.606c.309,1.735,1.71,14.926,1.934,18.47l1.4-.922,38.641-33.669,12.326,17.514-50.97,30.391,54.491-28.239,1.815-.938Z" transform="translate(-181.739)" fill="none" stroke="#dcb533" strokeWidth="0.4"/>
                                <path id="shape" data-name="shape" d="M1111.182,810.211a4.571,4.571,0,1,0,0,3.559,4.609,4.609,0,0,0,0-3.568ZM1106.959,816a4.008,4.008,0,1,1,4.013-4.006A4.008,4.008,0,0,1,1106.959,816Z" transform="translate(-878.999 -644.852)" fill="none" stroke="#dcb533" strokeWidth="0.2"/>
                                <path id="shape" data-name="shape" d="M1118.438,819.361a1.9,1.9,0,0,0-.524-.734,1.39,1.39,0,0,0,.752-1.29,1.338,1.338,0,0,0-.576-1.13,2.525,2.525,0,0,0-1.5-.407,7.877,7.877,0,0,0-1.4.142l-.079.014v5.226h.879v-2.235h.759c.635,0,1.048.725,1.234,2.151v.084h.87l-.016-.111A7.62,7.62,0,0,0,1118.438,819.361Zm-.881-1.378a1.428,1.428,0,0,1-.852.208h-.716v-1.582c.167-.016.371-.023.61-.023.829,0,1.231.26,1.231.8a.7.7,0,0,1-.273.6Z" transform="translate(-888.761 -651.342)" fill="none" stroke="#dcb533" strokeWidth="0.2"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <Header/>
            <div className="modal" id="mint-your-ares-modal">
                <div className="modal-close">
                    <a href="#" className="close-modal" data-modal="#mint-your-ares-modal">
                        <i className="fa-solid fa-xmark"></i>
                    </a>
                </div>
                <div className="modal-content">
                    <Snackbar open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={
                            {
                                vertical: 'top',
                                horizontal: 'center'
                            }
                    }>
                        <Alert onClose={handleClose}
                            severity={alertMessage.status}
                            sx={
                                {width: '100%'}
                        }>
                            {alertMessage.message}<br/>
                        </Alert>
                    </Snackbar>
                    <div className="modal-content-grid">
                        <div className="modal-content-grid-left">
                            <img src={logo}
                                className="img-fluid"
                                alt="ARES"/>
                            <img src={modaltilte}
                                className="title img-fluid"
                                alt=""/>
                                {(contractState==0||contractState==3)?
                                     <div className="counter">
                                     <div className="counter-item">
                                             
                                             <div>
                                                 <h2>-</h2>
                                                 <p>days</p>
                                             </div>
                                         </div>
                                         <div className="counter-item">
                                             <div>
                                                 <h2>-</h2>
                                                 <p>hours</p>
                                             </div>
                                         </div>
                                         <div className="counter-item">
                                             <div>
                                                 <h2>-</h2>
                                                 <p>mins</p>
                                             </div>
                                         </div>
                                         <div className="counter-item">
                                             <div>
                                                 <h2>-</h2>
                                                 <p>secs</p>
                                             </div>
                                         </div>
                                                  </div>
                                                  :
                                     <div className="counter">
                            <div className="counter-item">
                                    
                                    <div>
                                        <h2>{Math.floor(counters / 86400)}</h2>
                                        <p>days</p>
                                    </div>
                                </div>
                                <div className="counter-item">
                                    <div>
                                        <h2>{Math.floor((counters % 86400) / 3600)}</h2>
                                        <p>hours</p>
                                    </div>
                                </div>
                                <div className="counter-item">
                                    <div>
                                        <h2>{Math.floor((counters % 3600) / 60)}</h2>
                                        <p>mins</p>
                                    </div>
                                </div>
                                <div className="counter-item">
                                    <div>
                                        <h2>{counters % 60}</h2>
                                        <p>secs</p>
                                    </div>
                                </div>
                                         </div>}
                            <p>
                                Ares-NFT phase 1 will consist of rare, super
                                                                                                                                    rare and legendary NFTs, which is all determined
                                                                                                                                    by the kinds of traits and backgrounds that your
                                                                                                                                    Ares NFT will have. All buyers will become
                                                                                                                                    members. Mint yours now!
                            </p>
                            <div className="nft-form">
                                {
                                warnadd && (
                                    <Message type="error"
                                        message={warnadd}/>
                                )
                            }
                                {
                                message && (
                                    <Message type={
                                            message.type
                                        }
                                        message={
                                            message.message
                                        }/>
                                )
                            }

                                {
                                isConnected && mintableTokens > 0 && contractState > 0 && mintAmount > mintableTokens && (
                                    <div className="alert">
                                        <strong>you cannot mint more than{" "}
                                            {mintableTokens}
                                            nfts</strong>
                                    </div>
                                )
                            }
                                <div className="nft-form-top">
                                    <div className="nft-form-m">
                                        <button onClick={reduceAmount}
                                            disabled={
                                                mintAmount == 1
                                        }>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                    </div>
                                    <div className="nft-form-value">
                                        <input id="nft-form-val" name="nft-form-val"
                                            value={mintAmount}
                                            style={
                                                {pointerEvents: "none"}
                                            }/>{" "}
                                        NFT
                                    </div>
                                    <div className="nft-form-p">

                                        <button onClick={addAmount}
                                            disabled={
                                                mintAmount >= mintableTokens
                                        }>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>

                                    </div>
                                </div>
                                <div className="nft-form-bottom">
                                    {
                                    isConnected ? (
                                        <button onClick={handleMint}
                                            className="btn btn-primary">
                                            Mint
                                        </button>
                                    ) : (
                                        <button onClick={connectWallet}
                                            className="btn btn-primary">
                                            Connect your wallet
                                        </button>
                                    )
                                }
                                    {" "} </div>
                            </div>
                        </div>
                        <div className="modal-content-grid-right bk1">
                        
                        
                            
                        {currentPhase==0&&
                            <img
                            src={slider1}
                            className="img-fluid"
                            alt=""                   
                        />
                        
                            }
                              {currentPhase==1&&
                            <img
                            src={slider2}
                            className="img-fluid"
                            alt=""
                        />
                            }
                              {currentPhase==2&&
                            <img
                            src={slider3}
                            className="img-fluid"
                            alt=""
                        />
                            }
                              {currentPhase==3&&
                            <img
                            src={slider4}
                            className="img-fluid"
                            alt=""
                        />
                            }
                              {currentPhase==4&&
                            <img
                            src={slider4}
                            className="img-fluid"
                            alt=""
                        />
                            }
                        
                        {/* <img
                            src={whitelist}
                            className="img-fluid"
                            alt=""/>
                         */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-viewport">
                <div className="scroll-wrapper">
                    <section className="section section-full-height p-0">
                        <div className="intro-video intro-s">
                            <video src={"./IntroVideo.mp4"}
                                className="project-item-video"
                                autoPlay
                                muted
                                loop
                                id="intro-video"></video>
                            <div className="intro-button">
                                <a href="#about-section" className="smooth-scroll">
                                    <i className="fa-solid fa-angle-down"></i>
                                    Scroll To Explore
                                </a>
                            </div>
                        </div>
                    </section>
                    <section id="about-section" className="section about-section section-full-height">
                        <div className="about-section-background has-animation-about-image about-section-me"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-9 col-alignment">
                                    <h1 className="text-watermark has-animation">
                                        About us
                                    </h1>
                                    <h3 className="has-animation">
                                        <b>Ares Corporation</b>
                                        took root in
                                                                                                                                                                    2019 as the brainchild of a creative
                                                                                                                                                                    founder who transforms daring visions
                                                                                                                                                                    into
                                        <b>tangible reality</b>
                                    </h3>
                                    <a href="/about" className="btn btn-icon has-animation-fade-in">
                                        discover our story
                                        <i className="fa-solid fa-angle-right"></i>
                                    </a>
                                    <div className="light-shadow light-shadow-5"></div>
                                    <ul className="info-links-list has-animation-fade-in">
                                        <li>
                                            <a href="mailto:info@ares-corporation.com">
                                                info@ares-corporation.com
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailto:partnership@ares-corporation.com">
                                                partnership@ares-corporation.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section section-spacing-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <img src={image1}
                                        className="has-animation-fade-in img-fluid mb-1"
                                        alt=""/>
                                    <h6 className="h6 has-animation-fade-in">
                                        Purchase one and become one of us
                                    </h6>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12 text-center">
                                    <a href="/advantage" className="btn-text has-animation-fade-in">
                                        Advantages of being an Ares Member{" "}
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section section-full-height">
                        <div className="container-fluid">
                            <div className="aresnft-slider has-animation-fade-in">
                                <div className="aresnft-slider-images">
                                    <div className="aresnft-slider-background">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="504.24" height="630.132" viewBox="0 0 504.24 630.132">
                                            <defs>
                                                <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
                                                    <stop offset="0" stopColor="#edd32e"/>
                                                    <stop offset="1" stopColor="#e4b300"/>
                                                </linearGradient>
                                            </defs>

                                            <g id="slider-shape" transform="translate(7833.237 -7515.773)">
                                                <path id="slider-shape-fill-bg" d="M-8680.712,8389.211l203.157-248.8,205.431,245.955-19.54,159.27,9.829,28.219,27.9,33.292,15.22,27.269-238.842,136.128-241.188-136.128,67.1-88.779Z" transform="translate(896 -624.638)" fill="#141414"/>
                                                <path id="slider-shape-fill" d="M725.708,475.549l-55.611-79,21.554-160.038.425-3.153L690.1,230.99,491.911,0,677.066,237.534,658.84,372.9l-179.8-256.77-3.485-5.424-.086-.134L302.586,365.643,281.064,237.423,464.366,2.168,267.953,230.99l-2.081,2.412.56,3.3,25.693,153.108L232.319,475.58l-4.659,6.693,7.1,3.642L447.731,596.286,248.425,477.464,298.952,405,455.434,543.285l.631-18.022-46.656-41.4h0l-95.684-84.946,72.112-105.956,4.8,68.816.063-.9,5.834-83.567h-.047l10.162-14.979,57.259-84.134L475.4,342.8l.15-2.176,11.416-163.554,64.977,92.373,5.7,8.1,5.881,84.26.063-.9,4.73-68.146,77.8,110.592L510.2,521.8c-.158-13.639-.339-28.5-.434-30.51q-.544-10.335-1.269-20.639l-.789-10.3-.883-10.3-.086-1.159-.789-1.372-5.148-9.145c-1.695-3.059-3.477-6.07-5.219-9.1s-3.492-6.062-5.282-9.066l-5.369-9.027-5.929-10-.5-.844-5.992,11.092-4.888,9.058c-1.616,3.012-3.193,6.015-4.77,9.09s-3.217,6.055-4.73,9.121l-4.73,9.161-.662,1.285-.126,1.009-.883,10.249c-.284,3.429-.52,6.859-.789,10.288q-.749,10.249-1.261,20.608c-.134,2.633-.244,16.043-.347,27.963l6.709,5.952c.789-13.245,4.848-46.372,6.047-53.136.583-3.4,1.2-6.78,1.75-10.17l1.427-8.743,4.691-7.962c1.75-2.956,3.406-5.96,5.108-8.94,1.34-2.365,2.665-4.667,3.942-7.024l.071-.126q2.231,3.674,4.525,7.332c1.853,2.964,3.666,5.952,5.566,8.893l5.022,7.884,1.4,8.625,1.75,10.186c1.206,6.78,6.685,58.339,7.56,72.19l5.455-3.6L661.386,409.026l48.177,68.454L510.351,596.263,723.327,485.892l7.1-3.666Z" transform="translate(-8059.768 7532.893)" fill="#1a1a1a"/>
                                                <path id="slider-shape-stroke-1" d="M725.708,475.549l-55.611-79,21.554-160.038.425-3.153L690.1,230.99,491.911,0,677.066,237.534,658.84,372.9l-179.8-256.77-3.485-5.424-.086-.134L302.586,365.643,281.064,237.423,464.366,2.168,267.953,230.99l-2.081,2.412.56,3.3,25.693,153.108L232.319,475.58l-4.659,6.693,7.1,3.642L447.731,596.286,248.425,477.464,298.952,405,455.434,543.285l.631-18.022-46.656-41.4h0l-95.684-84.946,72.112-105.956,4.8,68.816.063-.9,5.834-83.567h-.047l10.162-14.979,57.259-84.134L475.4,342.8l.15-2.176,11.416-163.554,64.977,92.373,5.7,8.1,5.881,84.26.063-.9,4.73-68.146,77.8,110.592L510.2,521.8c-.158-13.639-.339-28.5-.434-30.51q-.544-10.335-1.269-20.639l-.789-10.3-.883-10.3-.086-1.159-.789-1.372-5.148-9.145c-1.695-3.059-3.477-6.07-5.219-9.1s-3.492-6.062-5.282-9.066l-5.369-9.027-5.929-10-.5-.844-5.992,11.092-4.888,9.058c-1.616,3.012-3.193,6.015-4.77,9.09s-3.217,6.055-4.73,9.121l-4.73,9.161-.662,1.285-.126,1.009-.883,10.249c-.284,3.429-.52,6.859-.789,10.288q-.749,10.249-1.261,20.608c-.134,2.633-.244,16.043-.347,27.963l6.709,5.952c.789-13.245,4.848-46.372,6.047-53.136.583-3.4,1.2-6.78,1.75-10.17l1.427-8.743,4.691-7.962c1.75-2.956,3.406-5.96,5.108-8.94,1.34-2.365,2.665-4.667,3.942-7.024l.071-.126q2.231,3.674,4.525,7.332c1.853,2.964,3.666,5.952,5.566,8.893l5.022,7.884,1.4,8.625,1.75,10.186c1.206,6.78,6.685,58.339,7.56,72.19l5.455-3.6L661.386,409.026l48.177,68.454L510.351,596.263,723.327,485.892l7.1-3.666Z" transform="translate(-8060.16 7532.5)" fill="none" stroke="#dcb533" strokeWidth="1"/>
                                                <path id="slider-shape-stroke-2" d="M725.708,475.549l-55.611-79,21.554-160.038.425-3.153L690.1,230.99,491.911,0,677.066,237.534,658.84,372.9l-179.8-256.77-3.485-5.424-.086-.134L302.586,365.643,281.064,237.423,464.366,2.168,267.953,230.99l-2.081,2.412.56,3.3,25.693,153.108L232.319,475.58l-4.659,6.693,7.1,3.642L447.731,596.286,248.425,477.464,298.952,405,455.434,543.285l.631-18.022-46.656-41.4h0l-95.684-84.946,72.112-105.956,4.8,68.816.063-.9,5.834-83.567h-.047l10.162-14.979,57.259-84.134L475.4,342.8l.15-2.176,11.416-163.554,64.977,92.373,5.7,8.1,5.881,84.26.063-.9,4.73-68.146,77.8,110.592L510.2,521.8c-.158-13.639-.339-28.5-.434-30.51q-.544-10.335-1.269-20.639l-.789-10.3-.883-10.3-.086-1.159-.789-1.372-5.148-9.145c-1.695-3.059-3.477-6.07-5.219-9.1s-3.492-6.062-5.282-9.066l-5.369-9.027-5.929-10-.5-.844-5.992,11.092-4.888,9.058c-1.616,3.012-3.193,6.015-4.77,9.09s-3.217,6.055-4.73,9.121l-4.73,9.161-.662,1.285-.126,1.009-.883,10.249c-.284,3.429-.52,6.859-.789,10.288q-.749,10.249-1.261,20.608c-.134,2.633-.244,16.043-.347,27.963l6.709,5.952c.789-13.245,4.848-46.372,6.047-53.136.583-3.4,1.2-6.78,1.75-10.17l1.427-8.743,4.691-7.962c1.75-2.956,3.406-5.96,5.108-8.94,1.34-2.365,2.665-4.667,3.942-7.024l.071-.126q2.231,3.674,4.525,7.332c1.853,2.964,3.666,5.952,5.566,8.893l5.022,7.884,1.4,8.625,1.75,10.186c1.206,6.78,6.685,58.339,7.56,72.19l5.455-3.6L661.386,409.026l48.177,68.454L510.351,596.263,723.327,485.892l7.1-3.666Z" transform="translate(-8060.16 7532.5)" fill="none" stroke="#dcb533" strokeWidth="1"/>
                                                <path id="slider-shape-stroke-3" d="M725.708,475.549l-55.611-79,21.554-160.038.425-3.153L690.1,230.99,491.911,0,677.066,237.534,658.84,372.9l-179.8-256.77-3.485-5.424-.086-.134L302.586,365.643,281.064,237.423,464.366,2.168,267.953,230.99l-2.081,2.412.56,3.3,25.693,153.108L232.319,475.58l-4.659,6.693,7.1,3.642L447.731,596.286,248.425,477.464,298.952,405,455.434,543.285l.631-18.022-46.656-41.4h0l-95.684-84.946,72.112-105.956,4.8,68.816.063-.9,5.834-83.567h-.047l10.162-14.979,57.259-84.134L475.4,342.8l.15-2.176,11.416-163.554,64.977,92.373,5.7,8.1,5.881,84.26.063-.9,4.73-68.146,77.8,110.592L510.2,521.8c-.158-13.639-.339-28.5-.434-30.51q-.544-10.335-1.269-20.639l-.789-10.3-.883-10.3-.086-1.159-.789-1.372-5.148-9.145c-1.695-3.059-3.477-6.07-5.219-9.1s-3.492-6.062-5.282-9.066l-5.369-9.027-5.929-10-.5-.844-5.992,11.092-4.888,9.058c-1.616,3.012-3.193,6.015-4.77,9.09s-3.217,6.055-4.73,9.121l-4.73,9.161-.662,1.285-.126,1.009-.883,10.249c-.284,3.429-.52,6.859-.789,10.288q-.749,10.249-1.261,20.608c-.134,2.633-.244,16.043-.347,27.963l6.709,5.952c.789-13.245,4.848-46.372,6.047-53.136.583-3.4,1.2-6.78,1.75-10.17l1.427-8.743,4.691-7.962c1.75-2.956,3.406-5.96,5.108-8.94,1.34-2.365,2.665-4.667,3.942-7.024l.071-.126q2.231,3.674,4.525,7.332c1.853,2.964,3.666,5.952,5.566,8.893l5.022,7.884,1.4,8.625,1.75,10.186c1.206,6.78,6.685,58.339,7.56,72.19l5.455-3.6L661.386,409.026l48.177,68.454L510.351,596.263,723.327,485.892l7.1-3.666Z" transform="translate(-8060.16 7532.5)" fill="none" stroke="#dcb533" strokeWidth="1"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="aresnft-slider-slides">
                                        <div id="slide-1" className="aresnft-slider-slide active">
                                            <img src={man1}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                        <div id="slide-2" className="aresnft-slider-slide">
                                            <img src={man2}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                        <div id="slide-3" className="aresnft-slider-slide">
                                            <img src={man3}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                        <div id="slide-4" className="aresnft-slider-slide">
                                            <img src={man4}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="aresnft-slider-content">
                                    <div className="aresnft-slider-text">
                                        <div className="section-count has-animation-fade-in">
                                            <p>1</p>
                                            <div>
                                                <span></span>
                                            </div>
                                            <p>3</p>
                                        </div>
                                        <h1 className="has-animation">
                                            The Story Behind
                                            <br/>
                                            <img src={svg}
                                                className="img-fluid"
                                                alt=""/>
                                        </h1>
                                        <p className="has-animation-text">
                                            Our NFTs pay ode to the powerful and
                                                                                                                                                                                    legendary warrior, Ares.
                                        </p>
                                        <p className="has-animation-text">
                                            His resurrection as well as the
                                                                                                                                                                                    glory of his reign centuries after
                                                                                                                                                                                    his death simply cannot be
                                                                                                                                                                                    overlooked. Those who have heard the
                                                                                                                                                                                    tales of his era know that he was a
                                                                                                                                                                                    commanding force that exuded
                                                                                                                                                                                    captivating power and strength.
                                        </p>
                                        <div className="aresnft-slider-content-actions">
                                            <a href="javascript:void(0)" className="btn-fi has-animation-fade-in open-modal" data-modal="#mint-your-ares-modal">
                                                <span className="btn-fi-line"></span>
                                                {" "}
                                                Mint now
                                            </a>
                                            <a href="/aresnft" className="btn btn-icon has-animation-fade-in">
                                                Find out more
                                                <i className="fa-solid fa-angle-right"></i>
                                            </a>
                                        </div>
                                        <div className="light-shadow light-shadow-4"></div>
                                        <ul className="info-links-list has-animation-fade-in">
                                            <li>
                                                <a href="mailto:support@ares-nft.com">
                                                    support@ares-nft.com
                                                </a>
                                            </li>
                                            <li>
                                                <a href="mailto:partnership@ares-nft.com">
                                                    partnership@ares-nft.com
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="aresnft-slide-nav-list-wrapper has-animation-fade-in">
                                        <div className="aresnft-slide-nav-list-line">
                                            <div className="aresnft-slide-nav-list-line-active">
                                                <span></span>
                                            </div>
                                        </div>
                                        <ul className="aresnft-slide-nav-list">
                                            <li className="active">
                                                <a href="#slide-1" className="aresnft-slide-nav active" data-slide="#slide-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35.103" height="41.633" viewBox="0 0 35.103 41.633">
                                                        <path className="aresnft-slide-nav-fill" d="M262.434,33.2l-3.883-5.516,1.5-11.174.03-.22-.138-.165L246.11,0l12.928,16.585-1.273,9.451L245.211,8.108l-.243-.379-.006-.009L232.891,25.53l-1.5-8.952L244.187.151,230.473,16.128l-.145.168.039.23,1.794,10.69-4.176,5.989-.325.467.5.254,14.87,7.706-13.916-8.3,3.528-5.06,10.926,9.655.044-1.258-3.258-2.891h0l-6.681-5.931,5.035-7.4.335,4.8,0-.063.407-5.835h0l.71-1.046,4-5.874.8,11.493.01-.152.8-11.419,4.537,6.45.4.566.411,5.883,0-.063.33-4.758,5.432,7.722-9.49,8.27c-.011-.952-.024-1.99-.03-2.13q-.038-.722-.089-1.441l-.055-.719-.062-.719-.006-.081-.055-.1-.359-.639c-.118-.214-.243-.424-.364-.635s-.244-.423-.369-.633l-.375-.63-.414-.7-.035-.059-.418.774-.341.632c-.113.21-.223.42-.333.635s-.225.423-.33.637l-.33.64-.046.09-.009.07-.062.716c-.02.239-.036.479-.055.718q-.052.716-.088,1.439c-.009.184-.017,1.12-.024,1.952l.468.416c.055-.925.339-3.238.422-3.71.041-.237.084-.473.122-.71l.1-.61.327-.556c.122-.206.238-.416.357-.624.094-.165.186-.326.275-.49l0-.009q.156.257.316.512c.129.207.256.416.389.621l.351.55.1.6.122.711c.084.473.467,4.073.528,5.04l.381-.252,10.545-9.188,3.364,4.779L247.4,41.632l14.87-7.706.5-.256Z" transform="translate(-227.66)" fill="#DCB533"/>
                                                    </svg>
                                                    <span></span>
                                                    Position 1
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#slide-2" className="aresnft-slide-nav" data-slide="#slide-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35.103" height="41.633" viewBox="0 0 35.103 41.633">
                                                        <path className="aresnft-slide-nav-fill" d="M262.434,33.2l-3.883-5.516,1.5-11.174.03-.22-.138-.165L246.11,0l12.928,16.585-1.273,9.451L245.211,8.108l-.243-.379-.006-.009L232.891,25.53l-1.5-8.952L244.187.151,230.473,16.128l-.145.168.039.23,1.794,10.69-4.176,5.989-.325.467.5.254,14.87,7.706-13.916-8.3,3.528-5.06,10.926,9.655.044-1.258-3.258-2.891h0l-6.681-5.931,5.035-7.4.335,4.8,0-.063.407-5.835h0l.71-1.046,4-5.874.8,11.493.01-.152.8-11.419,4.537,6.45.4.566.411,5.883,0-.063.33-4.758,5.432,7.722-9.49,8.27c-.011-.952-.024-1.99-.03-2.13q-.038-.722-.089-1.441l-.055-.719-.062-.719-.006-.081-.055-.1-.359-.639c-.118-.214-.243-.424-.364-.635s-.244-.423-.369-.633l-.375-.63-.414-.7-.035-.059-.418.774-.341.632c-.113.21-.223.42-.333.635s-.225.423-.33.637l-.33.64-.046.09-.009.07-.062.716c-.02.239-.036.479-.055.718q-.052.716-.088,1.439c-.009.184-.017,1.12-.024,1.952l.468.416c.055-.925.339-3.238.422-3.71.041-.237.084-.473.122-.71l.1-.61.327-.556c.122-.206.238-.416.357-.624.094-.165.186-.326.275-.49l0-.009q.156.257.316.512c.129.207.256.416.389.621l.351.55.1.6.122.711c.084.473.467,4.073.528,5.04l.381-.252,10.545-9.188,3.364,4.779L247.4,41.632l14.87-7.706.5-.256Z" transform="translate(-227.66)" fill="#DCB533"/>
                                                    </svg>
                                                    <span></span>
                                                    Position 2
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#slide-3" className="aresnft-slide-nav" data-slide="#slide-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35.103" height="41.633" viewBox="0 0 35.103 41.633">
                                                        <path className="aresnft-slide-nav-fill" d="M262.434,33.2l-3.883-5.516,1.5-11.174.03-.22-.138-.165L246.11,0l12.928,16.585-1.273,9.451L245.211,8.108l-.243-.379-.006-.009L232.891,25.53l-1.5-8.952L244.187.151,230.473,16.128l-.145.168.039.23,1.794,10.69-4.176,5.989-.325.467.5.254,14.87,7.706-13.916-8.3,3.528-5.06,10.926,9.655.044-1.258-3.258-2.891h0l-6.681-5.931,5.035-7.4.335,4.8,0-.063.407-5.835h0l.71-1.046,4-5.874.8,11.493.01-.152.8-11.419,4.537,6.45.4.566.411,5.883,0-.063.33-4.758,5.432,7.722-9.49,8.27c-.011-.952-.024-1.99-.03-2.13q-.038-.722-.089-1.441l-.055-.719-.062-.719-.006-.081-.055-.1-.359-.639c-.118-.214-.243-.424-.364-.635s-.244-.423-.369-.633l-.375-.63-.414-.7-.035-.059-.418.774-.341.632c-.113.21-.223.42-.333.635s-.225.423-.33.637l-.33.64-.046.09-.009.07-.062.716c-.02.239-.036.479-.055.718q-.052.716-.088,1.439c-.009.184-.017,1.12-.024,1.952l.468.416c.055-.925.339-3.238.422-3.71.041-.237.084-.473.122-.71l.1-.61.327-.556c.122-.206.238-.416.357-.624.094-.165.186-.326.275-.49l0-.009q.156.257.316.512c.129.207.256.416.389.621l.351.55.1.6.122.711c.084.473.467,4.073.528,5.04l.381-.252,10.545-9.188,3.364,4.779L247.4,41.632l14.87-7.706.5-.256Z" transform="translate(-227.66)" fill="#DCB533"/>
                                                    </svg>
                                                    <span></span>
                                                    Position 3
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#slide-4" className="aresnft-slide-nav" data-slide="#slide-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35.103" height="41.633" viewBox="0 0 35.103 41.633">
                                                        <path className="aresnft-slide-nav-fill" d="M262.434,33.2l-3.883-5.516,1.5-11.174.03-.22-.138-.165L246.11,0l12.928,16.585-1.273,9.451L245.211,8.108l-.243-.379-.006-.009L232.891,25.53l-1.5-8.952L244.187.151,230.473,16.128l-.145.168.039.23,1.794,10.69-4.176,5.989-.325.467.5.254,14.87,7.706-13.916-8.3,3.528-5.06,10.926,9.655.044-1.258-3.258-2.891h0l-6.681-5.931,5.035-7.4.335,4.8,0-.063.407-5.835h0l.71-1.046,4-5.874.8,11.493.01-.152.8-11.419,4.537,6.45.4.566.411,5.883,0-.063.33-4.758,5.432,7.722-9.49,8.27c-.011-.952-.024-1.99-.03-2.13q-.038-.722-.089-1.441l-.055-.719-.062-.719-.006-.081-.055-.1-.359-.639c-.118-.214-.243-.424-.364-.635s-.244-.423-.369-.633l-.375-.63-.414-.7-.035-.059-.418.774-.341.632c-.113.21-.223.42-.333.635s-.225.423-.33.637l-.33.64-.046.09-.009.07-.062.716c-.02.239-.036.479-.055.718q-.052.716-.088,1.439c-.009.184-.017,1.12-.024,1.952l.468.416c.055-.925.339-3.238.422-3.71.041-.237.084-.473.122-.71l.1-.61.327-.556c.122-.206.238-.416.357-.624.094-.165.186-.326.275-.49l0-.009q.156.257.316.512c.129.207.256.416.389.621l.351.55.1.6.122.711c.084.473.467,4.073.528,5.04l.381-.252,10.545-9.188,3.364,4.779L247.4,41.632l14.87-7.706.5-.256Z" transform="translate(-227.66)" fill="#DCB533"/>
                                                    </svg>
                                                    <span></span>
                                                    Position 4
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="aresnft-slide-nav-list-bullet">
                                            <div className="aresnft-slide-nav-list-bullet-border">
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section section-full-height">
                        <div className="container">
                            <div className="row row-height-auto">
                                <h1 className="text-watermark text-watermark-position text-watermark-position-right has-animation">
                                    <img src={image7}
                                        className="img-fluid"
                                        alt="ARES Investment"/>
                                    investment
                                </h1>
                            </div>
                            <div className="row row-xs-reverse">
                                <div className="col-md-6 col-alignment">
                                    <div className="section-count section-count-half has-animation-fade-in">
                                        <p>2</p>
                                        <div>
                                            <span></span>
                                        </div>
                                        <p>3</p>
                                    </div>
                                    <h1 className="has-animation">
                                        Ares: The Investment Of The Future
                                    </h1>
                                    <p className="has-animation-text">
                                        <i> {" "}
                                            Invest in the visionary dream of
                                                                                                                                                                                    your project to see the remarkable
                                                                                                                                                                                    results in reality{" "} </i>
                                    </p>
                                    <p className="has-animation-text">
                                        Oftentimes, people brimming with
                                                                                                                                                                    confidence don’t have the required funds
                                                                                                                                                                    to see their dreams take flight. Any
                                                                                                                                                                    project, be it big or small, demands
                                                                                                                                                                    considerable financial capital. Without
                                                                                                                                                                    sufficient funding, project success is
                                                                                                                                                                    far from guaranteed.
                                    </p>
                                    <a href="/investment" className="btn btn-icon has-animation-fade-in">
                                        Find out more
                                        <i className="fa-solid fa-angle-right"></i>
                                    </a>
                                    <div className="light-shadow light-shadow-3"></div>
                                    <ul className="info-links-list has-animation-fade-in">
                                        <li>
                                            <a href="mailto:support@ares-investment.com">
                                                support@ares-investment.com
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailto:partnership@ares-investment.com">
                                                partnership@ares-investment.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6 col-alignment">
                                    <div className="img-watermark img-watermark-normal has-animation-fade-in-from-right">
                                        <img src={image2}
                                            className="img-fluid"
                                            alt="The story behind Ares NFT"/>
                                        <img src={image2}
                                            className="img-fluid"
                                            alt="The story behind Ares NFT"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section section-full-height">
                        <div className="container">
                            <div className="row row-height-auto">
                                <h1 className="text-watermark text-watermark-position has-animation">
                                    <img src={image7}
                                        className="img-fluid"
                                        alt="ARES Investment"/>
                                    Edition
                                </h1>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-alignment">
                                    <div className="img-watermark img-watermark-lighten has-animation-fade-in-from-left img-www">
                                        <img src={image3}
                                            className="img-fluid img-www1"
                                            alt="The story behind Ares NFT"/>
                                        <img src={image3}
                                            className="img-fluid"
                                            alt="The story behind Ares NFT"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-alignment">
                                    <div className="section-count section-count-full has-animation-fade-in">
                                        <p>3</p>
                                        <div>
                                            <span></span>
                                        </div>
                                        <p>3</p>
                                    </div>
                                    <h1 className="has-animation">
                                        How
                                        <b>Shazane Nazaraly’s</b>
                                        Innovative
                                                                                                                                                                    Idea Gave Rise To A Ground-breaking{" "}
                                        <b>Luxury Car</b>
                                    </h1>
                                    <p className="has-animation-text">
                                        Growing up, Shazane Nazaraly fell in
                                                                                                                                                                    love with his fair share of sports cars.
                                                                                                                                                                    However, his idea of luxury was always
                                                                                                                                                                    unconventional.
                                    </p>
                                    <a href="/edition" className="btn btn-icon has-animation-fade-in">
                                        Find out more
                                        <i className="fa-solid fa-angle-right"></i>
                                    </a>
                                    <ul className="info-links-list has-animation-fade-in">
                                        <li>
                                            <a href="mailto:support@ares-edition.com">
                                                support@ares-edition.com
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailto:partnership@ares-edition.com">
                                                partnership@ares-edition.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section projects-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 align-self-center">
                                    <div className="project-item project-item-blue">
                                        <div className="project-item-bg pro-miss"></div>
                                        <a href="/edition"></a>
                                        <video src={"./project-item.mp4"}
                                            className="project-item-video"
                                            autoPlay
                                            muted
                                            loop
                                            type="video/mp4">
                                            Your browser does not support the
                                                                                                                                                                                    video tag.
                                        </video>

                                        <div className="project-item-content">
                                            <img src={image6}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 align-self-center">
                                    <div className="project-item project-item-orange">
                                        <div className="project-item-bg pro-a"></div>
                                        <a href="/aresnft"></a>
                                        <video src={"./project-item.mp4"}
                                            className="project-item-video"
                                            autoPlay
                                            muted
                                            loop>
                                            Your browser does not support the
                                                                                                                                                                                    video tag.
                                        </video>
                                        <div className="project-item-content">
                                            <img src={image4}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 align-self-center">
                                    <div className="project-item project-item-red">
                                        <div className="project-item-bg pro-b"></div>
                                        <a href="/investment"></a>
                                        <video src={"./project-item.mp4"}
                                            className="project-item-video"
                                            autoPlay
                                            muted
                                            loop>
                                            Your browser does not support the
                                                                                                                                                                                    video tag.
                                        </video>
                                        <div className="project-item-content">
                                            <img src={image5}
                                                className="img-fluid"
                                                alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer/>
        </>
    );
}
