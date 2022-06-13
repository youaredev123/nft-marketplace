import React, { useEffect } from "react";

import Logo from "assets/images/logo.svg";
import BackgroundImage1 from "assets/images/b-img1.png";
import BackgroundImage2 from "assets/images/b-img2.png";
import BackgroundImage3 from "assets/images/b-img3.png";

import { Link } from "react-router-dom";
import { WOW } from "wowjs";
import $ from "jquery";

const BecomeInfluencer = () => {
  useEffect(() => {
    const wow = new WOW({ live: false, offset: 0, mobile: true });
    let scrolled = false;
    $(window).on('scroll', function () {
      if (!scrolled) {
        scrolled = true;
        wow.init();
      }
    });

    $('.page-loader').delay(900).fadeOut(700, function () {
      $('body').fadeIn();
    });

    $('.menu-icon').click(function () {
      $('body').toggleClass("open-menu");
    });

    $('.menu-mobile li.has-child a').click(function () {
      var content = $(this).parent().find("ul");
      if ($(content).is(":visible")) {
        $(content).slideUp();
        $(content).removeClass("active");
        $(this).removeClass("active");
      } else {
        $(content).slideDown();
        $(content).addClass("active");
        $(this).addClass("active");
      }
      return false;
    });
  }, []);

  return (
    <div className={"become-influencer-page"}>
      <div className="page-loader">
      </div>
      <div className="page">
        <header className="header">
          <div className="container-fluid">
            <div className="header-inner">
              <Link to={"/"} title="" className="logo">
                <img alt="" src={Logo}/>
              </Link>
              <div className="header-right">
                <Link to={"/auth"} className="link">
                  <div className="icon icon-signup">
                  </div>
                  Sign Up
                </Link>
                <Link to={"/auth"} className="link">
                  <div className="icon icon-login">
                  </div>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>
        <section className="become-hero">
          <div className="container">
            <div className="inner">
              <div className="content">
                <div className="des wow fadeInUp" data-wow-delay="0.7s">
                  <h1>Become an <br/>
                    Influencer <br/>for <span>Relica.</span></h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="become-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="thumb wow fadeInRight" data-wow-delay="0.4s">
                  <img alt="" src={BackgroundImage1}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des wow fadeInLeft" data-wow-delay="0.3s">
                  <h3>Produce <br/>Amazing <br/>Content?</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="become-block">
          <div className="container">
            <div className="row align-items-center row-mobile">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des wow fadeInLeft text-left" data-wow-delay="0.3s">
                  <h3>Seeking <br/>another form <br/>of income?</h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="thumb wow fadeInRight" data-wow-delay="0.4s">
                  <img alt="" src={BackgroundImage2}/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="become-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="thumb wow fadeInRight" data-wow-delay="0.4s">
                  <img alt="" src={BackgroundImage3}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des wow fadeInLeft" data-wow-delay="0.3s">
                  <h3>Want to be at <br/>the forefront of <br/>a revolution in<br/> social media?</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="become-join wow fadeInUp" data-wow-delay="0.3s">
          <div className="container">
            <div className="inner">
              <div className="content">
                <div className="des wow fadeInUp" data-wow-delay="0.7s">
                  <h1>Fill out the application and <span>Join Us</span></h1>
                  <p>Please send to <span>influencers@relica.world</span> and we’ll endeavour to get back to you</p>
                  <a href="/Application_Relica_Influencers.pdf" download="/Application_Relica_Influencers.pdf" target="_blank" className="button">Fill here</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="left">
                © 2021 Relica Pty Ltd, All Rights Reserved.
              </div>
              <div className="right">
                <ul className="menu-footer">
                  <li><Link to={"/"}>Home</Link></li>
                  <li><a href="#">Privacy policy</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                </ul>
                <div className="social">
                  <a href="https://www.instagram.com/relica.world/" className="instagram">
                  </a>
                  <a href="https://twitter.com/Relicaworld" className="twitter">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BecomeInfluencer;
