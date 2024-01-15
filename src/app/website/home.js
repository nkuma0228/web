import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { isCommonLoggedIn } from "../../utils";

import Slider1 from "../../assets/website/images/slider1.png";
import Slider2 from "../../assets/website/images/slider2.png";
import Slider3 from "../../assets/website/images/slider3.png";
import Slider4 from "../../assets/website/images/slider4.png";

import Service1 from "../../assets/website/images/Service-1.png";
import Service2 from "../../assets/website/images/Service-2.png";
import Service3 from "../../assets/website/images/new_car_showroom.jpg";

const Home = () => {
  const { i18n, t } = useTranslation();
  const [loginShow, setLoginShow] = useState(false);
  const handleClose = () => setLoginShow(false);
  const handleShow = () => setLoginShow(true);

  const [headerLogin, setHeaderLogin] = useState({});
  useEffect(() => {
    let getHeaderLogin = isCommonLoggedIn();
    setHeaderLogin(getHeaderLogin);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "auto",
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />

      <ModalBox
        loginShow={loginShow}
        handleClose={handleClose}
        handleShow={handleShow}
        aciveShow={false}
      />

      <div className="SliderArea">
        <div id="Slide" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators carousel_indicator_mvp">
            <li data-target="#Slide" data-slide-to="0" className="active"></li>
            <li data-target="#Slide" data-slide-to="1"></li>
            <li data-target="#Slide" data-slide-to="2"></li>
            <li data-target="#Slide" data-slide-to="3"></li>
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img alt="" src={Slider1} />
            </div>
            <div className="carousel-item">
              <img alt="" src={Slider2} />
            </div>
            <div className="carousel-item">
              <img alt="" src={Slider3} />
            </div>
            <div className="carousel-item">
              <img alt="" src={Slider4} />
            </div>
          </div>
          <a className="carousel-control-prev" href="#Slide" data-slide="prev">
            <i className="fa fa-angle-left"></i>
          </a>
          <a className="carousel-control-next" href="#Slide" data-slide="next">
            <i className="fa fa-angle-right"></i>
          </a>
        </div>
        <div className="SlideContent slider_text_hide_mvp">
          <h3> {t("website.home.Allyourautomotiveneedsinoneplace")} </h3>
          <p>{t("website.home.Ourvehiclesareoneofthemost")}</p>
          <ul>
            <li>
              <Link to="/auto-repair">{t("website.home.AutoRepair")}</Link>
            </li>
            <li>
              <Link to="/auto-parts">{t("website.home.AutoParts")}</Link>
            </li>
            <li>
              <Link to="/auto-sales">{t("website.home.AutoSales")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="need_help">
        <h3> {t("website.home.NeedHelpWithYourVehicle")} </h3>
        <h6> {t("website.home.SelectButtonService")} </h6>
        <div className="need_help_btn_group">
          <span className="need_help_btn">
            <Link to="/auto-repair">{t("website.home.AutoRepair")}</Link>
          </span>
          <span className="need_help_btn">
            {" "}
            <Link to="/auto-parts">{t("website.home.AutoParts")}</Link>
          </span>
          <span className="need_help_btn">
            <Link to="/auto-sales">{t("website.home.AutoSales")}</Link>
          </span>
        </div>
      </div>
      <section>
        <div className="ServiceArea">
          <div className="container">
            <h3> {t("website.home.Welcomeautoserviceproviders")} </h3>
            <div className="row">
              <div className="col-sm-4">
                <div className="ServiceBox">
                  <figure>
                    <img alt="" src={Service1} />
                  </figure>
                  <figcaption>
                    <h4> {t("website.home.Forgarageownersandtowtrucks")} </h4>
                    <aside>
                      <p> {t("website.home.Foradditionalinformation")} </p>
                    </aside>
                    <article>
                      {headerLogin &&
                      Object.getOwnPropertyNames(headerLogin).length != 0 ? (
                        <Link to="/service-auto-repair">
                          {" "}
                          {t("website.home.Moreinfo")}{" "}
                        </Link>
                      ) : (
                        <>
                          <Link to="/service-auto-repair">
                            {t("website.home.Moreinfo")}
                          </Link>
                          <Link to="" onClick={handleShow}>
                            {t("website.home.Login")}
                          </Link>
                        </>
                      )}
                    </article>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="ServiceBox">
                  <figure>
                    <img alt="" src={Service2} />
                  </figure>
                  <figcaption>
                    <h4> {t("website.home.Forautopartsvendors")} </h4>
                    <aside>
                      <p> {t("website.home.Autowizisincontact")} </p>
                    </aside>
                    <article>
                      {headerLogin &&
                      Object.getOwnPropertyNames(headerLogin).length != 0 ? (
                        <Link to="/service-auto-parts">
                          {t("website.home.Moreinfo")}
                        </Link>
                      ) : (
                        <>
                          <Link to="/service-auto-parts">
                            {t("website.home.Moreinfo")}
                          </Link>
                          <Link to="" onClick={handleShow}>
                            {t("website.home.Login")}
                          </Link>
                        </>
                      )}
                    </article>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="ServiceBox">
                  <figure>
                    <img
                      alt=""
                      src={Service3}
                      className="img_new_car_showroom"
                    />
                  </figure>
                  <figcaption>
                    <h4> {t("website.home.Forautosalesdealers")} </h4>
                    <aside>
                      <p>{t("website.home.Ifyouareinthemarket")}</p>
                    </aside>
                    <article>
                      {headerLogin &&
                      Object.getOwnPropertyNames(headerLogin).length != 0 ? (
                        <Link to="/service-auto-sales">
                          {t("website.home.Moreinfo")}
                        </Link>
                      ) : (
                        <>
                          <Link to="/service-auto-sales">
                            {t("website.home.Moreinfo")}
                          </Link>
                          <Link to="" onClick={handleShow}>
                            {t("website.home.Login")}
                          </Link>
                        </>
                      )}
                    </article>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
