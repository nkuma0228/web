import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ModalBox from "./modal";

import "../../assets/common-css.css";

import { isCommonLoggedIn } from "../../utils";
import { setCountryInitiate } from "../../redux/actions/provider/authAction";

import Logo from "../../assets/website/images/Logo.png";
import Flag1 from "../../assets/website/images/Flag-1.png";
import Flag2 from "../../assets/website/images/Flag-2.png";
import Flag3 from "../../assets/website/images/Flag-3.jpg";
import Flag4 from "../../assets/website/images/Flag-spain-4.png";

const Header = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const [flagShow, setFlagShow] = useState(Flag1);
  var lang = i18n.language;

  useEffect(() => {
    if (lang == "fr") {
      setFlagShow(Flag3);
    } else {
      setFlagShow(Flag1);
    }
  }, [lang]);

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
    if (e.target.value == "en") {
      setFlagShow(Flag1);
    } else {
      setFlagShow(Flag3);
    }
  }

  const [loginShow, setLoginShow] = useState(false);
  const [signupTextShow, setSignupTextShow] = useState("Client");

  const handleClose = () => setLoginShow(false);
  const handleShow = () => {
    setSignupTextShow("Client");
    setLoginShow(true);
  };

  const [headerLogin, setHeaderLogin] = useState({});

  useEffect(() => {
    let getHeaderLogin = isCommonLoggedIn();
    setHeaderLogin(getHeaderLogin);
  }, []);

  //const [CountryShow, setCountryShow] = useState("USA");
  const handleCountryUSA = () => {
    //setCountryShow("USA");
    dispatch(setCountryInitiate("USA"));
    //window.localStorage.setItem("setCountry", "USA")
  };
  const handleCountryCA = () => {
    //setCountryShow("CA");
    dispatch(setCountryInitiate("CA"));
    //window.localStorage.setItem("setCountry", "CA")
  };

  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const hamburger = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="24"
      viewBox="0 0 52 24"
    >
      <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
        <rect
          id="Rectangle_3"
          data-name="Rectangle 3"
          width="42"
          height="4"
          rx="2"
          transform="translate(304 47)"
          fill="#574c4c"
        />
        <rect
          id="Rectangle_5"
          data-name="Rectangle 5"
          width="42"
          height="4"
          rx="2"
          transform="translate(304 67)"
          fill="#574c4c"
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width="52"
          height="4"
          rx="2"
          transform="translate(294 57)"
          fill="#574c4c"
        />
      </g>
    </svg>
  );

  return (
    <>
      <header>
        <div className="Header">
          <div className="container">
            <nav className="navbar navbar-expand header_lvp_section">
              <Link className="navbar-brand" to="/">
                <img src={Logo} />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href={void 0}
                      onClick={handleCountryUSA}
                    >
                      <img src={Flag1} />
                      {t("website.header.US")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href={void 0}
                      onClick={handleCountryCA}
                    >
                      <img src={Flag2} />
                      {t("website.header.Canada")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a class="nav-link" href={void 0}>
                      <span>{t("website.header.Language")} : </span>
                      <img src={flagShow} />
                      <select onChange={changeLanguage}>
                        <option
                          value="en"
                          style={{ color: "#000" }}
                          selected={lang == "en" ? "selected" : ""}
                        >
                          ENG
                        </option>
                        <option
                          value="fr"
                          style={{ color: "#000" }}
                          selected={lang == "fr" ? "selected" : ""}
                        >
                          FR
                        </option>
                      </select>
                    </a>
                  </li>
                  <li className="nav-item">
                    {headerLogin &&
                    Object.getOwnPropertyNames(headerLogin).length != 0 ? (
                      <Link className="nav-link" to={headerLogin.url}>
                        {headerLogin.signpFor == "client"
                          ? headerLogin.firstName
                          : headerLogin.business}
                      </Link>
                    ) : (
                      <a
                        className="nav-link"
                        href={void 0}
                        onClick={handleShow}
                      >
                        {t("website.header.LoginorRegister")}
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </nav>
            <nav className="navbar header_svp_section">
              <div className="container">
                <div className="logo">
                  <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="logo" />
                  </Link>
                </div>
                <div className="svp_lang_select_container">
                  <div className="svp_flag">
                    <span>
                      <img src={Flag1} alt="lang" />
                    </span>
                    <span>ER</span>
                    <span>
                      <input
                        type="radio"
                        value="en"
                        checked={lang === "en"}
                        onChange={changeLanguage}
                      />
                    </span>
                  </div>
                  <div className="svp_flag">
                    <span>
                      <img src={Flag3} alt="lang" />
                    </span>
                    <span>FR</span>
                    <span>
                      <input
                        type="radio"
                        value="fr"
                        checked={lang === "fr"}
                        onChange={changeLanguage}
                      />
                    </span>
                  </div>
                  <div className="svp_flag">
                    <span>
                      <img className="svp_spain_flag" src={Flag4} alt="lang" />
                    </span>
                    <span>ES</span>
                    <span>
                      <input
                        type="radio"
                        value="spain"
                        checked={lang === "spain"}
                        onChange={changeLanguage}
                      />
                    </span>
                  </div>
                </div>
                {/* <div className="menu-icon" onClick={handleShowNavbar}>
                  {hamburger()}
                </div> */}
                {/* <div className={`nav-elements  ${showNavbar && "active"}`}>
                  <ul>
                    <li className="nav-item svg_lang_font">
                      <label>{t("website.header.Language")}:</label>
                    </li>
                    <li className="nav-item svp_flag_btn">
                      <span>
                        <input
                          type="radio"
                          value="en"
                          checked={lang === "en"}
                          onChange={changeLanguage}
                        />
                      </span>
                      <span className="svp_pad_lang">ENG</span>
                      <span>
                        <input
                          type="radio"
                          value="fr"
                          checked={lang === "fr"}
                          onChange={changeLanguage}
                        />
                      </span>
                      <span className="svp_pad_lang">FR</span>
                    </li>
                    <hr className="hr_ruler_line" />
                    <li className="nav-item svp_flag_btn">
                      {headerLogin &&
                      Object.getOwnPropertyNames(headerLogin).length != 0 ? (
                        <Link className="nav-link" to={headerLogin.url}>
                          {headerLogin.signpFor == "client"
                            ? headerLogin.firstName
                            : headerLogin.business}
                        </Link>
                      ) : (
                        <Link
                          className="nav-link"
                          to=""
                          onClick={handleShow}
                          alt="user"
                        >
                          {t("website.header.LoginorRegister")}
                        </Link>
                      )}
                    </li>
                  </ul>
                </div> */}
              </div>
            </nav>
          </div>
        </div>

        <ModalBox
          loginShow={loginShow}
          handleClose={handleClose}
          handleShow={handleShow}
          aciveShow={true}
          signupTextShow={signupTextShow}
        />
      </header>
    </>
  );
};

export default Header;
