const [link,linkproperty]=useState(window.location.pathname);
 if(link=="/about")
  return (   
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-left">
            <ul className="navbar-menu">
              <li>                  
                <a href="/about" id="aboutjs"  className="active">About Us</a>
                                 
              </li>
              <li>
                <a href="/edition" id="edit">Edition</a>
            </li>
               <li className="dropdown">
                <a  data-dropdown>
                  {" "}
                  NFT{" "}
                </a>
                <ul className="dropdown-menu">
                  <li>
                  <a href="/aresnft">AresNFT</a>
                  </li>
                  <li>
                  <a href="/advantage">Advantage</a>                   
                  </li>
                </ul>
              </li>
              <li>
              <a href="/investment">Investment</a>
               </li>
            </ul>
          </div>
          <div className="navbar-middle">
            <div className="navbar-middle-item">
              <a href="#" className="nav-menu-toggle">
                <span></span>
                <span></span>
              </a>
            </div>
            <div className="navbar-middle-item">
            <a href="/">
                <img src={logo} className="img-fluid" alt="ARES" />
                </a>
            </div>
            <div className="navbar-middle-item">
              <a href="#" className="nav-socials-toggle">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
            <div className="navbar-middle-item">
              <ul className="navbar-socials-mobile">
                <li>
                  <a href="https://twitter.com/CorpAres" target="_blank">
                    <img src={Headerone} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/arescorporation/"
                    target="_blank"
                  >
                    <img src={Headertwo} className="img-fluid" alt="ARES" />
                  </a>
                </li>
                <li>
                  <a href="https://t.co/a5v2en4HFq" target="_blank">
                    <img src={Headerthree} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                    target="_blank"
                  >
                    <img src={Headerfour} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                    <img src={Headerfive} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                    target="_blank"
                  >
                    <img src={Headersix} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/Arescorporationn"
                    target="_blank"
                  >
                    <img src={Headerseven} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a href="https://opensea.io/Ares_NFT_" target="_blank">
                    <img src={Headereight} className="img-fluid" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-right">
            <ul className="navbar-socials">
              <li>
                <a href="https://twitter.com/CorpAres" target="_blank">
                  <img src={Headerone} className="img-fluid" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arescorporation/"
                  target="_blank"
                >
                  <img src={Headertwo} className="img-fluid" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/36QvVQAYMA" target="_blank">
                  <img src={Headerthree} className="img-fluid" />
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                  target="_blank"
                >
                  <img src={Headerfour} className="img-fluid" />
                  <span>Youtube</span>
                </a>
              </li>
              <li>
                <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                  <img src={Headerfive} className="img-fluid" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                  target="_blank"
                >
                  <img src={Headersix} className="img-fluid" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Arescorporationn"
                  target="_blank"
                >
                  <img src={Headerseven} className="img-fluid" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://opensea.io/Ares-NFT" target="_blank">
                  <img src={Headereight} className="img-fluid" />
                  <span>Opensea</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
 if(link=="/investment")
 return (
    
  <header>
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <ul className="navbar-menu">
            <li>
                
              <a href="/about" id="aboutjs" >About Us</a>
               
              
            </li>
            <li>
              <a href="/edition" id="edit">Edition</a>
          </li>
             <li className="dropdown">
              <a  data-dropdown>
                {" "}
                NFT{" "}
              </a>
              <ul className="dropdown-menu">
                <li>
                <a href="/aresnft">AresNFT</a>
                </li>
                <li>
                <a href="/advantage">Advantage</a>                   
                </li>
              </ul>
            </li>
            <li>
            <a href="/investment" className="active">Investment</a>
             </li>
          </ul>
        </div>
        <div className="navbar-middle">
          <div className="navbar-middle-item">
            <a href="#" className="nav-menu-toggle">
              <span></span>
              <span></span>
            </a>
          </div>
          <div className="navbar-middle-item">
          <a href="/">
              <img src={logo} className="img-fluid" alt="ARES" />
              </a>
          </div>
          <div className="navbar-middle-item">
            <a href="#" className="nav-socials-toggle">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className="navbar-middle-item">
            <ul className="navbar-socials-mobile">
              <li>
                <a href="https://twitter.com/CorpAres" target="_blank">
                  <img src={Headerone} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arescorporation/"
                  target="_blank"
                >
                  <img src={Headertwo} className="img-fluid" alt="ARES" />
                </a>
              </li>
              <li>
                <a href="https://t.co/a5v2en4HFq" target="_blank">
                  <img src={Headerthree} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                  target="_blank"
                >
                  <img src={Headerfour} className="img-fluid" />
                </a>
              </li>
              <li>
                <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                  <img src={Headerfive} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                  target="_blank"
                >
                  <img src={Headersix} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Arescorporationn"
                  target="_blank"
                >
                  <img src={Headerseven} className="img-fluid" />
                </a>
              </li>
              <li>
                <a href="https://opensea.io/Ares_NFT_" target="_blank">
                  <img src={Headereight} className="img-fluid" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-right">
          <ul className="navbar-socials">
            <li>
              <a href="https://twitter.com/CorpAres" target="_blank">
                <img src={Headerone} className="img-fluid" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/arescorporation/"
                target="_blank"
              >
                <img src={Headertwo} className="img-fluid" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="https://discord.gg/36QvVQAYMA" target="_blank">
                <img src={Headerthree} className="img-fluid" />
                <span>Discord</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                target="_blank"
              >
                <img src={Headerfour} className="img-fluid" />
                <span>Youtube</span>
              </a>
            </li>
            <li>
              <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                <img src={Headerfive} className="img-fluid" />
                <span>TikTok</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                target="_blank"
              >
                <img src={Headersix} className="img-fluid" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/Arescorporationn"
                target="_blank"
              >
                <img src={Headerseven} className="img-fluid" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://opensea.io/Ares-NFT" target="_blank">
                <img src={Headereight} className="img-fluid" />
                <span>Opensea</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
);
if(link=="/edition")
return (
   
 <header>
   <div className="container">
     <nav className="navbar">
       <div className="navbar-left">
         <ul className="navbar-menu">
           <li>
               
             <a href="/about" id="aboutjs" >About Us</a>
              
             
           </li>
           <li>
             <a href="/edition" id="edit" className="active">Edition</a>
         </li>
            <li className="dropdown">
             <a  data-dropdown>
               {" "}
               NFT{" "}
             </a>
             <ul className="dropdown-menu">
               <li>
               <a href="/aresnft">AresNFT</a>
               </li>
               <li>
               <a href="/advantage">Advantage</a>                   
               </li>
             </ul>
           </li>
           <li>
           <a href="/investment">Investment</a>
            </li>
         </ul>
       </div>
       <div className="navbar-middle">
         <div className="navbar-middle-item">
           <a href="#" className="nav-menu-toggle">
             <span></span>
             <span></span>
           </a>
         </div>
         <div className="navbar-middle-item">
         <a href="/">
             <img src={logo} className="img-fluid" alt="ARES" />
             </a>
         </div>
         <div className="navbar-middle-item">
           <a href="#" className="nav-socials-toggle">
             <span></span>
             <span></span>
             <span></span>
           </a>
         </div>
         <div className="navbar-middle-item">
           <ul className="navbar-socials-mobile">
             <li>
               <a href="https://twitter.com/CorpAres" target="_blank">
                 <img src={Headerone} className="img-fluid" />
               </a>
             </li>
             <li>
               <a
                 href="https://www.instagram.com/arescorporation/"
                 target="_blank"
               >
                 <img src={Headertwo} className="img-fluid" alt="ARES" />
               </a>
             </li>
             <li>
               <a href="https://t.co/a5v2en4HFq" target="_blank">
                 <img src={Headerthree} className="img-fluid" />
               </a>
             </li>
             <li>
               <a
                 href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                 target="_blank"
               >
                 <img src={Headerfour} className="img-fluid" />
               </a>
             </li>
             <li>
               <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                 <img src={Headerfive} className="img-fluid" />
               </a>
             </li>
             <li>
               <a
                 href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                 target="_blank"
               >
                 <img src={Headersix} className="img-fluid" />
               </a>
             </li>
             <li>
               <a
                 href="https://www.facebook.com/Arescorporationn"
                 target="_blank"
               >
                 <img src={Headerseven} className="img-fluid" />
               </a>
             </li>
             <li>
               <a href="https://opensea.io/Ares_NFT_" target="_blank">
                 <img src={Headereight} className="img-fluid" />
               </a>
             </li>
           </ul>
         </div>
       </div>
       <div className="navbar-right">
         <ul className="navbar-socials">
           <li>
             <a href="https://twitter.com/CorpAres" target="_blank">
               <img src={Headerone} className="img-fluid" />
               <span>Twitter</span>
             </a>
           </li>
           <li>
             <a
               href="https://www.instagram.com/arescorporation/"
               target="_blank"
             >
               <img src={Headertwo} className="img-fluid" />
               <span>Instagram</span>
             </a>
           </li>
           <li>
             <a href="https://discord.gg/36QvVQAYMA" target="_blank">
               <img src={Headerthree} className="img-fluid" />
               <span>Discord</span>
             </a>
           </li>
           <li>
             <a
               href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
               target="_blank"
             >
               <img src={Headerfour} className="img-fluid" />
               <span>Youtube</span>
             </a>
           </li>
           <li>
             <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
               <img src={Headerfive} className="img-fluid" />
               <span>TikTok</span>
             </a>
           </li>
           <li>
             <a
               href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
               target="_blank"
             >
               <img src={Headersix} className="img-fluid" />
               <span>LinkedIn</span>
             </a>
           </li>
           <li>
             <a
               href="https://www.facebook.com/Arescorporationn"
               target="_blank"
             >
               <img src={Headerseven} className="img-fluid" />
               <span>Facebook</span>
             </a>
           </li>
           <li>
             <a href="https://opensea.io/Ares-NFT" target="_blank">
               <img src={Headereight} className="img-fluid" />
               <span>Opensea</span>
             </a>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 </header>
);
if(link=="/aresnft")
return (
   
  <header>
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <ul className="navbar-menu">
            <li>
                
              <a href="/about" id="aboutjs" >About Us</a>
               
              
            </li>
            <li>
              <a href="/edition" id="edit">Edition</a>
          </li>
             <li className="dropdown">
              <a  data-dropdown className="active">
                {" "}
                NFT{" "}
              </a>
              <ul className="dropdown-menu">
                <li>
                <a href="/aresnft">AresNFT</a>
                </li>
                <li>
                <a href="/advantage">Advantage</a>                   
                </li>
              </ul>
            </li>
            <li>
            <a href="/investment">Investment</a>
             </li>
          </ul>
        </div>
        <div className="navbar-middle">
          <div className="navbar-middle-item">
            <a href="#" className="nav-menu-toggle">
              <span></span>
              <span></span>
            </a>
          </div>
          <div className="navbar-middle-item">
          <a href="/">
              <img src={logo} className="img-fluid" alt="ARES" />
              </a>
          </div>
          <div className="navbar-middle-item">
            <a href="#" className="nav-socials-toggle">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className="navbar-middle-item">
            <ul className="navbar-socials-mobile">
              <li>
                <a href="https://twitter.com/CorpAres" target="_blank">
                  <img src={Headerone} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arescorporation/"
                  target="_blank"
                >
                  <img src={Headertwo} className="img-fluid" alt="ARES" />
                </a>
              </li>
              <li>
                <a href="https://t.co/a5v2en4HFq" target="_blank">
                  <img src={Headerthree} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                  target="_blank"
                >
                  <img src={Headerfour} className="img-fluid" />
                </a>
              </li>
              <li>
                <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                  <img src={Headerfive} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                  target="_blank"
                >
                  <img src={Headersix} className="img-fluid" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Arescorporationn"
                  target="_blank"
                >
                  <img src={Headerseven} className="img-fluid" />
                </a>
              </li>
              <li>
                <a href="https://opensea.io/Ares_NFT_" target="_blank">
                  <img src={Headereight} className="img-fluid" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-right">
          <ul className="navbar-socials">
            <li>
              <a href="https://twitter.com/CorpAres" target="_blank">
                <img src={Headerone} className="img-fluid" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/arescorporation/"
                target="_blank"
              >
                <img src={Headertwo} className="img-fluid" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="https://discord.gg/36QvVQAYMA" target="_blank">
                <img src={Headerthree} className="img-fluid" />
                <span>Discord</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                target="_blank"
              >
                <img src={Headerfour} className="img-fluid" />
                <span>Youtube</span>
              </a>
            </li>
            <li>
              <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                <img src={Headerfive} className="img-fluid" />
                <span>TikTok</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                target="_blank"
              >
                <img src={Headersix} className="img-fluid" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/Arescorporationn"
                target="_blank"
              >
                <img src={Headerseven} className="img-fluid" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://opensea.io/Ares-NFT" target="_blank">
                <img src={Headereight} className="img-fluid" />
                <span>Opensea</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
 );
 if(link=="/advantage")
 return (
    
   <header>
     <div className="container">
       <nav className="navbar">
         <div className="navbar-left">
           <ul className="navbar-menu">
             <li>
                 
               <a href="/about" id="aboutjs" >About Us</a>
                
               
             </li>
             <li>
               <a href="/edition" id="edit">Edition</a>
           </li>
              <li className="dropdown">
               <a  data-dropdown className="active">
                 {" "}
                 NFT{" "}
               </a>
               <ul className="dropdown-menu">
                 <li>
                 <a href="/aresnft">AresNFT</a>
                 </li>
                 <li>
                 <a href="/advantage">Advantage</a>                   
                 </li>
               </ul>
             </li>
             <li>
             <a href="/investment">Investment</a>
              </li>
           </ul>
         </div>
         <div className="navbar-middle">
           <div className="navbar-middle-item">
             <a href="#" className="nav-menu-toggle">
               <span></span>
               <span></span>
             </a>
           </div>
           <div className="navbar-middle-item">
           <a href="/">
               <img src={logo} className="img-fluid" alt="ARES" />
               </a>
           </div>
           <div className="navbar-middle-item">
             <a href="#" className="nav-socials-toggle">
               <span></span>
               <span></span>
               <span></span>
             </a>
           </div>
           <div className="navbar-middle-item">
             <ul className="navbar-socials-mobile">
               <li>
                 <a href="https://twitter.com/CorpAres" target="_blank">
                   <img src={Headerone} className="img-fluid" />
                 </a>
               </li>
               <li>
                 <a
                   href="https://www.instagram.com/arescorporation/"
                   target="_blank"
                 >
                   <img src={Headertwo} className="img-fluid" alt="ARES" />
                 </a>
               </li>
               <li>
                 <a href="https://t.co/a5v2en4HFq" target="_blank">
                   <img src={Headerthree} className="img-fluid" />
                 </a>
               </li>
               <li>
                 <a
                   href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                   target="_blank"
                 >
                   <img src={Headerfour} className="img-fluid" />
                 </a>
               </li>
               <li>
                 <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                   <img src={Headerfive} className="img-fluid" />
                 </a>
               </li>
               <li>
                 <a
                   href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                   target="_blank"
                 >
                   <img src={Headersix} className="img-fluid" />
                 </a>
               </li>
               <li>
                 <a
                   href="https://www.facebook.com/Arescorporationn"
                   target="_blank"
                 >
                   <img src={Headerseven} className="img-fluid" />
                 </a>
               </li>
               <li>
                 <a href="https://opensea.io/Ares_NFT_" target="_blank">
                   <img src={Headereight} className="img-fluid" />
                 </a>
               </li>
             </ul>
           </div>
         </div>
         <div className="navbar-right">
           <ul className="navbar-socials">
             <li>
               <a href="https://twitter.com/CorpAres" target="_blank">
                 <img src={Headerone} className="img-fluid" />
                 <span>Twitter</span>
               </a>
             </li>
             <li>
               <a
                 href="https://www.instagram.com/arescorporation/"
                 target="_blank"
               >
                 <img src={Headertwo} className="img-fluid" />
                 <span>Instagram</span>
               </a>
             </li>
             <li>
               <a href="https://discord.gg/36QvVQAYMA" target="_blank">
                 <img src={Headerthree} className="img-fluid" />
                 <span>Discord</span>
               </a>
             </li>
             <li>
               <a
                 href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                 target="_blank"
               >
                 <img src={Headerfour} className="img-fluid" />
                 <span>Youtube</span>
               </a>
             </li>
             <li>
               <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                 <img src={Headerfive} className="img-fluid" />
                 <span>TikTok</span>
               </a>
             </li>
             <li>
               <a
                 href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                 target="_blank"
               >
                 <img src={Headersix} className="img-fluid" />
                 <span>LinkedIn</span>
               </a>
             </li>
             <li>
               <a
                 href="https://www.facebook.com/Arescorporationn"
                 target="_blank"
               >
                 <img src={Headerseven} className="img-fluid" />
                 <span>Facebook</span>
               </a>
             </li>
             <li>
               <a href="https://opensea.io/Ares-NFT" target="_blank">
                 <img src={Headereight} className="img-fluid" />
                 <span>Opensea</span>
               </a>
             </li>
           </ul>
         </div>
       </nav>
     </div>
   </header>
  );
  if(link=="/claim")
  return (
     
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-left">
            <ul className="navbar-menu">
              <li>
                  
                <a href="/about" id="aboutjs" >About Us</a>
                 
                
              </li>
              <li>
                <a href="/edition" id="edit">Edition</a>
            </li>
               <li className="dropdown">
                <a  data-dropdown className="active">
                  {" "}
                  NFT{" "}
                </a>
                <ul className="dropdown-menu">
                  <li>
                  <a href="/aresnft">AresNFT</a>
                  </li>
                  <li>
                  <a href="/advantage">Advantage</a>                   
                  </li>
                </ul>
              </li>
              <li>
              <a href="/investment">Investment</a>
               </li>
            </ul>
          </div>
          <div className="navbar-middle">
            <div className="navbar-middle-item">
              <a href="#" className="nav-menu-toggle">
                <span></span>
                <span></span>
              </a>
            </div>
            <div className="navbar-middle-item">
            <a href="/">
                <img src={logo} className="img-fluid" alt="ARES" />
                </a>
            </div>
            <div className="navbar-middle-item">
              <a href="#" className="nav-socials-toggle">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
            <div className="navbar-middle-item">
              <ul className="navbar-socials-mobile">
                <li>
                  <a href="https://twitter.com/CorpAres" target="_blank">
                    <img src={Headerone} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/arescorporation/"
                    target="_blank"
                  >
                    <img src={Headertwo} className="img-fluid" alt="ARES" />
                  </a>
                </li>
                <li>
                  <a href="https://t.co/a5v2en4HFq" target="_blank">
                    <img src={Headerthree} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                    target="_blank"
                  >
                    <img src={Headerfour} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                    <img src={Headerfive} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                    target="_blank"
                  >
                    <img src={Headersix} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/Arescorporationn"
                    target="_blank"
                  >
                    <img src={Headerseven} className="img-fluid" />
                  </a>
                </li>
                <li>
                  <a href="https://opensea.io/Ares_NFT_" target="_blank">
                    <img src={Headereight} className="img-fluid" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-right">
            <ul className="navbar-socials">
              <li>
                <a href="https://twitter.com/CorpAres" target="_blank">
                  <img src={Headerone} className="img-fluid" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arescorporation/"
                  target="_blank"
                >
                  <img src={Headertwo} className="img-fluid" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/36QvVQAYMA" target="_blank">
                  <img src={Headerthree} className="img-fluid" />
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCnukiavYKM0JaS6SFycV5wQ"
                  target="_blank"
                >
                  <img src={Headerfour} className="img-fluid" />
                  <span>Youtube</span>
                </a>
              </li>
              <li>
                <a href="https://vt.tiktok.com/ZSdu8dn2n/" target="_blank">
                  <img src={Headerfive} className="img-fluid" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/mwlite/in/ares-corporation-632786233"
                  target="_blank"
                >
                  <img src={Headersix} className="img-fluid" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Arescorporationn"
                  target="_blank"
                >
                  <img src={Headerseven} className="img-fluid" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://opensea.io/Ares-NFT" target="_blank">
                  <img src={Headereight} className="img-fluid" />
                  <span>Opensea</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
   );