import React, {useState} from "react";
import Footer from "./components/Footer";
import merch from "./images/content/ares-claim-merch.svg";
import rond from "./images/content/Ares-logo-rond.png";
import whitet from "./images/content/White-T-shirt.png";
import blackt from "./images/content/Black-T-shirt.png";
import redt from "./images/content/Red-T-shirt.png";
import greyt from "./images/content/Grey-T-shirt.png";
import whitecap from "./images/content/White-Cap.png";
import blackcap from "./images/content/Black-Cap.png";
import redcap from "./images/content/Red-Cap.png";
import greycap from "./images/content/Grey-Cap.png";
import Header from "./components/Header";
import "./App.css";
import loader from "./images/content/logo-loader.svg";
import axios from "axios";
export default function App() {
    const [selectcap, setselectcap] = useState("");
    const [selectshirt, setselectshirt] = useState("");
    const [selectsize,setselectsize]=useState("");
    const [name, setname] = useState("");
    const [surname, setsurname] = useState("");
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [zip, setzip] = useState("");
    const [country, setcountry] = useState("");
    const [city, setcity] = useState("");
     const handleInputChange = (e) => {
        const {id, value} = e.target;
        if (id === "name") {
            setname(value);
        }
        if (id === "surname") {
            setsurname(value);
        }
        if (id === "email") {
            setemail(value);
        }
        if (id === "address") {
            setaddress(value);
        }
        if (id === "zip") {
            setzip(value);
        }
        if (id === "country") {

            setcountry(value);
        }
        if (id === "city") {
            setcity(value);
        }

    };

    const handleshirtColorChange = (value) => {
      setselectshirt(value)
    }
    const handlecapColorChange = (value) => {
      setselectcap(value)
    }
    const handleSizeChange = (value) => {
      setselectsize(value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/detail', {
          selectshirt,
          selectcap,
          selectsize,
            name,
            surname,
            email,
            address,
            zip,
            country,
            city
        });        
            
      alert("Sucessful!");
      }

  
    return (
        <>
            <div className="loading">
                <div className="loading-logo"><img src={loader}
                        className="img-fluid"
                        alt="Ares Corporation"/>
                </div>
            </div>
            <Header/>

            <div className="scroll-viewport">
                <div className="scroll-wrapper">
                    <div className="page-backgorund claim"></div>
                    <section className="section section-top section-claim-merch">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <img src={merch}
                                        className="img-fluid has-animation-fade-in"
                                        alt="Ares Claim Merch"/>
                                </div>
                            </div>
                             <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className="claim-merch">
                                        <div className="claim-merch-left has-animation-fade-in">
                                            <div className="claim-merch-shirt-options">
                                                <div className="claim-merch-background">
                                                    <img src={rond}
                                                        className="img-fluid"
                                                        alt="Ares"/>
                                                </div>
                                                <div id="option-white-t-shirt" className="claim-merch-shirt-option active">
                                                    <img src={whitet}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                                <div id="option-black-t-shirt" className="claim-merch-shirt-option">
                                                    <img src={blackt}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                                <div id="option-red-t-shirt" className="claim-merch-shirt-option">
                                                    <img src={redt}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                                <div id="option-grey-t-shirt" className="claim-merch-shirt-option">
                                                    <img src={greyt}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                            </div>
                                            <div className="claim-merch-cap-options">
                                                <div id="option-white-cap" className="claim-merch-cap-option active">
                                                    <img src={whitecap}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                                <div id="option-black-cap" className="claim-merch-cap-option">
                                                    <img src={blackcap}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                                <div id="option-red-cap" className="claim-merch-cap-option">
                                                    <img src={redcap}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                                <div id="option-grey-cap" className="claim-merch-cap-option">
                                                    <img src={greycap}
                                                        className="img-fluid"
                                                        alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="claim-merch-right has-animation-fade-in">
                                            <h3 className="has-animation">
                                                Signature polo with embrodery & Ares classic
                                                                                                                        baseball cap
                                            </h3>
                                            <div className="claim-merch-select">
                                                <div className="claim-merch-select-item">
                                                    <a data-dropdown href="#" className="claim-merch-select-item-selected claim-merch-select-t-shirt-link">
                                                        Select T-Shirt color
                                                    </a>
                                                    <input type="text" id="claim-merch-selected-t-shirt"/>
                                                    <ul className="claim-merch-select-t-shirt">
                                                        <li onClick={() => handleshirtColorChange('white-tshirt')}>
                                                            <a href="#" data-input-val="white-tshirt" data-select="#option-white-t-shirt" >
                                                                <img src={whitet}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                White
                                                            </a>
                                                        </li>
                                                        <li onClick={() => handleshirtColorChange('black-tshirt')}>
                                                            <a href="#" data-input-val="black-tshirt" data-select="#option-black-t-shirt">
                                                                <img src={blackt}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                Black
                                                            </a>
                                                        </li>
                                                        <li onClick={() => handleshirtColorChange('red-tshirt')}>
                                                            <a href="#" data-input-val="red-tshirt" data-select="#option-red-t-shirt">
                                                                <img src={redt}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                Red
                                                            </a>
                                                        </li>
                                                        <li onClick={() => handleshirtColorChange('grey-tshirt')}>
                                                            <a href="#" data-input-val="grey-tshirt" data-select="#option-grey-t-shirt">
                                                                <img src={greyt}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                Grey
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="claim-merch-select-item">
                                                    <a href="#" className="claim-merch-select-item-selected claim-merch-select-cap-link">
                                                        Select Cap color
                                                    </a>
                                                    <input type="text" id="claim-merch-selected-cap"
                                                        style={
                                                            {display: "none"}
                                                        }/>
                                                    <ul className="claim-merch-select-cap">
                                                        <li  onClick={() => handlecapColorChange('white-cap')}>
                                                            <a href="#" data-input-val="white-cap" data-select="#option-white-cap">
                                                                {" "}
                                                                <img src={whitecap}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                White
                                                            </a>
                                                        </li>
                                                        <li  onClick={() => handlecapColorChange('black-cap')}>
                                                            <a href="#" data-input-val="black-cap" data-select="#option-black-cap">
                                                                {" "}
                                                                <img src={blackcap}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                Black
                                                            </a>
                                                        </li>
                                                        <li  onClick={() => handlecapColorChange('red-cap')}>
                                                            <a href="#" data-input-val="red-cap" data-select="#option-red-cap">
                                                                {" "}
                                                                <img src={redcap}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                Red
                                                            </a>
                                                        </li>
                                                        <li onClick={() => handlecapColorChange('grey-cap')}>
                                                            <a href="#" data-input-val="grey-cap" data-select="#option-grey-cap">
                                                                {" "}
                                                                <img src={greycap}
                                                                    className="img-fluid"
                                                                    alt=""/>
                                                                Grey
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="claim-merch-select-item">
                                                    <a href="#" className="claim-merch-select-item-selected claim-merch-select-size-link">
                                                        Select Size
                                                    </a>
                                                    <input type="text" id="claim-merch-selected-size"
                                                        style={
                                                            {display: "none"}
                                                        }/>
                                                    <ul className="claim-merch-select-size">
                                                        <li onClick={() => handleSizeChange('S')}>
                                                            <a href="#">S</a>
                                                        </li>
                                                        <li onClick={() => handleSizeChange('M')}>
                                                            <a href="#">M</a>
                                                        </li>
                                                        <li onClick={() => handleSizeChange('L')}>
                                                            <a href="#">L</a>
                                                        </li>
                                                        <li onClick={() => handleSizeChange('XL')}>
                                                            <a href="#">XL</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p>
                                                Each fine-textured, breathable polo shirt is crafted
                                                                                                                        with cotton and comes in various color shades to satisfy
                                                                                                                        every palette. This signature design is unique to our
                                                                                                                        Ares collection. Our retro cotton blend cap is made with
                                                                                                                        premium fabrics and designed to have a comfortable
                                                                                                                        silhouette. This signature Ares cap features a
                                                                                                                        structured crown and an adjustable closure to serve as a
                                                                                                                        staple piece in any wardrobe.
                                            </p>

                                            <a href="#" className="btn-fi claim-merch-next">
                                                Next
                                            </a>
                                        </div>
                                    </div>

                                    <div className="claim-form">
                                        <div className="claim-form-content">
                                            <form onSubmit={handleSubmit}>
                                                <div className="claim-form-row">
                                                    <div className="claim-form-col-2">
                                                        <div>

                                                            <input type="text" id="name" name="name" className="form-control" placeholder="Name"
                                                                value={name}
                                                                onChange=
                                                                {(e) => handleInputChange(e)}/>
                                                        </div>
                                                     </div>
                                                    <div className="claim-form-col-2">

                                                        <input type="text" id="surname" name="surname" className="form-control" placeholder="Surname"
                                                            value={surname}
                                                            onChange=
                                                            {(e) => handleInputChange(e)}/>
                                                    </div>
                                                </div>
                                                <div className="claim-form-row">
                                                    <div className="claim-form-col-1">
                                                        <input type="text" id="address" name="address" className="form-control" placeholder="Address"
                                                            value={address}
                                                            onChange=
                                                            {(e) => handleInputChange(e)}/>
                                                    </div>
                                                </div>
                                                <div className="claim-form-row">
                                                    <div className="claim-form-col-1">
                                                        <input type="email" id="email" name="email"
                                                            value={email}
                                                            className="form-control"
                                                            placeholder="E-mail"
                                                            onChange=
                                                            {(e) => handleInputChange(e)}/>
                                                    </div>
                                                </div>
                                                <div className="claim-form-row">
                                                    <div className="claim-form-col-3">

                                                        <input type="text" id="zip" name="zip"
                                                            value={zip}
                                                            className="form-control"
                                                            placeholder="zip code"
                                                            onChange=
                                                            {(e) => handleInputChange(e)}/>
                                                    </div>
                                                    <div className="claim-form-col-3">
                                               
                                                   
                                                    <select id="country" name="country"
                                                            value={country}
                                                            onChange={(e) => handleInputChange(e)}
                                                            className="form-control">
                                                            <option value="">Choose Country</option>
                                                            <option value="AF">Afghanistan</option>
                                                            <option value="ÅL">Åland Islands</option>
                                                            <option value="Algeria">Algeria</option>
                                                            <option value="AS">American Samoa</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AO">Angola</option>
                                                            <option value="AQ">Antarctica</option>
                                                            <option value="AG">Antigua and Barbuda</option>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia</option>
                                                            <option value="BA">Bosnia and Herzegovina
                                                            </option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">British Indian Ocean
                                                                                                                        Territory</option>
                                                            <option value="BN">Brunei Darussalam</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Republic
                                                            </option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CL">Chile</option>
                                                            <option value="CN">China</option>
                                                            <option value="CX">Christmas Island</option>
                                                            <option value="CC">Cocos (Keeling) Islands
                                                            </option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo</option>
                                                            <option value="CD">Congo, The
                                                                                                                        Democratic Republic of The</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="CI">Cote D'ivoire</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="SV">El Salvador</option>
                                                            <option value="GQ">Equatorial Guinea</option>
                                                            <option value="ER">Eritrea</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="ET">Ethiopia</option>
                                                            <option value="FK">Falkland Islands
                                                                                                                        (Malvinas)</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FJ">Fiji</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="FR">France</option>
                                                            <option value="GF">French Guiana</option>
                                                            <option value="PF">French Polynesia</option>
                                                            <option value="TF">French Southern
                                                                                                                        Territories</option>
                                                            <option value="GA">Gabon</option>
                                                            <option value="GM">Gambia</option>
                                                            <option value="GE">Georgia</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GH">Ghana</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="GD">Grenada</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GU">Guam</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GN">Guernsey</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="Haiti">Haiti</option>
                                                            <option value="GG">Heard Island and
                                                                                                                        Mcdonald Islands</option>
                                                            <option value="HT">Holy See (Vatican City
                                                                                                                        State)</option>
                                                            <option value="Honduras">Honduras</option>
                                                            <option value="Hong Kong">Hong Kong</option>
                                                            <option value="Hungary">Hungary</option>
                                                            <option value="Iceland">Iceland</option>
                                                            <option value="India">India</option>
                                                            <option value="Indonesia">Indonesia</option>
                                                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of
                                                            </option>
                                                            <option value="Iraq">Iraq</option>
                                                            <option value="Ireland">Ireland</option>
                                                            <option value="Isle of Man">Isle of Man</option>
                                                            <option value="Israel">Israel</option>
                                                            <option value="Italy">Italy</option>
                                                            <option value="Jamaica">Jamaica</option>
                                                            <option value="Japan">Japan</option>
                                                            <option value="Jersey">Jersey</option>
                                                            <option value="Jordan">Jordan</option>
                                                            <option value="Kazakhstan">Kazakhstan</option>
                                                            <option value="Kenya">Kenya</option>
                                                            <option value="Kiribati">Kiribati</option>
                                                            <option value="Korea, Democratic People's Republic of">Korea,
                                                                                                                        Democratic People's Republic of</option>
                                                            <option value="Korea, Republic of">Korea, Republic of</option>
                                                            <option value="Kuwait">Kuwait</option>
                                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                            <option value="Lao People's Democratic Republic">Lao People's
                                                                                                                        Democratic Republic</option>
                                                            <option value="Latvia">Latvia</option>
                                                            <option value="Lebanon">Lebanon</option>
                                                            <option value="Lesotho">Lesotho</option>
                                                            <option value="Liberia">Liberia</option>
                                                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya
                                                            </option>
                                                            <option value="Liechtenstein">Liechtenstein</option>
                                                            <option value="Lithuania">Lithuania</option>
                                                            <option value="Luxembourg">Luxembourg</option>
                                                            <option value="Macao">Macao</option>
                                                            <option value="Macedonia, The Former Yugoslav Republic of">
                                                                Macedonia, The Former Yugoslav Republic of</option>
                                                            <option value="Madagascar">Madagascar</option>
                                                            <option value="Malawi">Malawi</option>
                                                            <option value="Malaysia">Malaysia</option>
                                                            <option value="Maldives">Maldives</option>
                                                            <option value="Mali">Mali</option>
                                                            <option value="Malta">Malta</option>
                                                            <option value="Marshall Islands">Marshall Islands</option>
                                                            <option value="Martinique">Martinique</option>
                                                            <option value="Mauritania">Mauritania</option>
                                                            <option value="Mauritius">Mauritius</option>
                                                            <option value="Mayotte">Mayotte</option>
                                                            <option value="Mexico">Mexico</option>
                                                            <option value="Micronesia, Federated States of">Micronesia,
                                                                                                                        Federated States of</option>
                                                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                            <option value="Monaco">Monaco</option>
                                                            <option value="Mongolia">Mongolia</option>
                                                            <option value="Montenegro">Montenegro</option>
                                                            <option value="Montserrat">Montserrat</option>
                                                            <option value="Morocco">Morocco</option>
                                                            <option value="Mozambique">Mozambique</option>
                                                            <option value="Myanmar">Myanmar</option>
                                                            <option value="Namibia">Namibia</option>
                                                            <option value="Nauru">Nauru</option>
                                                            <option value="Nepal">Nepal</option>
                                                            <option value="Netherlands">Netherlands</option>
                                                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                            <option value="New Caledonia">New Caledonia</option>
                                                            <option value="New Zealand">New Zealand</option>
                                                            <option value="Nicaragua">Nicaragua</option>
                                                            <option value="Niger">Niger</option>
                                                            <option value="Nigeria">Nigeria</option>
                                                            <option value="Niue">Niue</option>
                                                            <option value="Norfolk Island">Norfolk Island</option>
                                                            <option value="Northern Mariana Islands">Northern Mariana Islands
                                                            </option>
                                                            <option value="Norway">Norway</option>
                                                            <option value="Oman">Oman</option>
                                                            <option value="Pakistan">Pakistan</option>
                                                            <option value="Palau">Palau</option>
                                                            <option value="Palestinian Territory, Occupied">Palestinian
                                                                                                                        Territory, Occupied</option>
                                                            <option value="Panama">Panama</option>
                                                            <option value="Papua New Guinea">Papua New Guinea</option>
                                                            <option value="Paraguay">Paraguay</option>
                                                            <option value="Peru">Peru</option>
                                                            <option value="Philippines">Philippines</option>
                                                            <option value="Pitcairn">Pitcairn</option>
                                                            <option value="Poland">Poland</option>
                                                            <option value="Portugal">Portugal</option>
                                                            <option value="Puerto Rico">Puerto Rico</option>
                                                            <option value="Qatar">Qatar</option>
                                                            <option value="Reunion">Reunion</option>
                                                            <option value="Romania">Romania</option>
                                                            <option value="Russian Federation">Russian Federation</option>
                                                            <option value="Rwanda">Rwanda</option>
                                                            <option value="Saint Helena">Saint Helena</option>
                                                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                            <option value="Saint Lucia">Saint Lucia</option>
                                                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon
                                                            </option>
                                                            <option value="Saint Vincent and The Grenadines">Saint Vincent and
                                                                                                                        The Grenadines</option>
                                                            <option value="Samoa">Samoa</option>
                                                            <option value="San Marino">San Marino</option>
                                                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                                            <option value="Senegal">Senegal</option>
                                                            <option value="Serbia">Serbia</option>
                                                            <option value="Seychelles">Seychelles</option>
                                                            <option value="Sierra Leone">Sierra Leone</option>
                                                            <option value="Singapore">Singapore</option>
                                                            <option value="Slovakia">Slovakia</option>
                                                            <option value="Slovenia">Slovenia</option>
                                                            <option value="Solomon Islands">Solomon Islands</option>
                                                            <option value="Somalia">Somalia</option>
                                                            <option value="South Africa">South Africa</option>
                                                            <option value="South Georgia and The South Sandwich Islands">South
                                                                                                                        Georgia and The South Sandwich Islands</option>
                                                            <option value="Spain">Spain</option>
                                                            <option value="Sri Lanka">Sri Lanka</option>
                                                            <option value="Sudan">Sudan</option>
                                                            <option value="Suriname">Suriname</option>
                                                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen
                                                            </option>
                                                            <option value="Swaziland">Swaziland</option>
                                                            <option value="Sweden">Sweden</option>
                                                            <option value="Switzerland">Switzerland</option>
                                                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                            <option value="Taiwan">Taiwan</option>
                                                            <option value="Tajikistan">Tajikistan</option>
                                                            <option value="Tanzania, United Republic of">Tanzania, United
                                                                                                                        Republic of</option>
                                                            <option value="Thailand">Thailand</option>
                                                            <option value="Timor-leste">Timor-leste</option>
                                                            <option value="Togo">Togo</option>
                                                            <option value="Tokelau">Tokelau</option>
                                                            <option value="Tonga">Tonga</option>
                                                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                            <option value="Tunisia">Tunisia</option>
                                                            <option value="Turkey">Turkey</option>
                                                            <option value="Turkmenistan">Turkmenistan</option>
                                                            <option value="Turks and Caicos Islands">Turks and Caicos Islands
                                                            </option>
                                                            <option value="Tuvalu">Tuvalu</option>
                                                            <option value="Uganda">Uganda</option>
                                                            <option value="Ukraine">Ukraine</option>
                                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                                            <option value="United Kingdom">United Kingdom</option>
                                                            <option value="United States">United States</option>
                                                            <option value="United States Minor Outlying Islands">United States
                                                                                                                        Minor Outlying Islands</option>
                                                            <option value="Uruguay">Uruguay</option>
                                                            <option value="Uzbekistan">Uzbekistan</option>
                                                            <option value="Vanuatu">Vanuatu</option>
                                                            <option value="Venezuela">Venezuela</option>
                                                            <option value="Viet Nam">Viet Nam</option>
                                                            <option value="Virgin Islands, British">Virgin Islands, British
                                                            </option>
                                                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                            <option value="Western Sahara">Western Sahara</option>
                                                            <option value="Yemen">Yemen</option>
                                                            <option value="Zambia">Zambia</option>
                                                            <option value="Zimbabwe">Zimbabwe</option>
                                                        </select>
                                               
                                                   </div>


                                                    <div className="claim-form-col-3">
                                                           
                                                        <input type="text" id="city" name="city" className="form-control" placeholder="City"
                                                            value={city}
                                                            onChange=
                                                            {(e) => handleInputChange(e)}/>
                                                    </div>
                                                </div>
                                                <div className="claim-form-row claim-form-row-reverse">
                                                    <div className="claim-form-col-8">
                                                        <div className="claim-form-actions">
                                                            <a href="#" className="claim-merch-back">
                                                                <i className="fa-sharp fa-solid fa-arrow-left"></i>
                                                                {" "}
                                                                Back
                                                            </a>
                                                            <button className="btn-fi" id="claim-form-submit" type="submit">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="claim-form-col-4">
                                                        <div className="form-checkbox">
                                                            <input type="checkbox" id="terms" name="terms" value="terms"/>
                                                            <label htmlFor="terms">
                                                                <p>
                                                                    by continuing you accept the general
                                                                                                                                                                          conditions and our{" "}
                                                                    <a href="#" className="open-terms">
                                                                        <u>privacy policy</u>
                                                                    </a>
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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
