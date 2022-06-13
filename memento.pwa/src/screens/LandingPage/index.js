import React, { useEffect, useState } from "react";
import Logo from "assets/images/logo.svg";
import IconGet from "assets/images/icon-get.svg";
import LandingPage1 from "assets/images/landing-page-1.png";
import LandingPage2 from "assets/images/2.png";
import LandingPage3 from "assets/images/3.png";
import LandingPage4 from "assets/images/4.png";
import LandingPage5 from "assets/images/5.png";
import LandingPage6 from "assets/images/6.png";
import Icon1 from "assets/images/icon1.svg";
import Icon2 from "assets/images/icon2.svg";
import Icon3 from "assets/images/icon3.svg";
import Icon4 from "assets/images/icon4.svg";
import Icon5 from "assets/images/icon5.svg";
import Icon6 from "assets/images/icon6.svg";
import Step1 from "assets/images/n1.png";
import Step2 from "assets/images/n2.png";
import Step3 from "assets/images/n3.png";
import IBg from "assets/images/i-bg.png";
import LandingI1 from "assets/images/i1.png";
import LandingMap from "assets/images/m1.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import { WOW } from "wowjs";
import { SliderContainer, StyledSlider, StyledThumb, StyledTrack } from "screens/LandingPage/styles";

import "assets/scss/landing-page.scss";

const LandingPage = () => {
  const [slideValue, setSlideValue] = useState(20);

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
    <div className={"landing-page"}>
      <div className="page-loader">
      </div>
      <div className="page">
        <header className="header">
          <div className="container-fluid">
            <div className="header-inner">
              <a href="#" title="" className="logo">
                <img src={Logo} style={{ height: "70px" }} alt={"Relica"}/>
              </a>
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
        <section className="home-hero">
          <div className="container">
            <div className="inner">
              <div className="content">
                <div className="des wow fadeInUp" data-wow-delay="0.7s">
                  <h1>Post photos. <br/>Make money. <br/>Maintain <br/>ownership.</h1>
                  <Link to={"/auth"} className="button">Sign Up / Login</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block-one">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="thumb wow fadeInUp" data-wow-delay="0.3s">
                  <img alt="" src={LandingPage1}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des wow fadeInRight" data-wow-delay="0.4s">
                  <h3>Introducing <br/>Relica, the new <br/>social media.</h3>
                  <p>Relica has a unique vision: to reignite the excitement of social media with a simple, easy-to-use
                    photo sharing app that provides you the opportunity to generate income from your content.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="des des-feature wow fadeInUp" data-wow-delay="0.7s">
                  <h3> As featured on:</h3>
                  <div className="des-feature__img">
                    <img alt="CoinGreek" src={LandingPage6}/>
                    <img alt="Bitcon" src={LandingPage5}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="block-two wow fadeIn" data-wow-delay="0.3s">
          <div className="container">
            <div className="embed-container">
              <iframe src="https://www.youtube.com/embed/B7DN9TzcuWY" frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          </div>
        </section>

        <section className="block-three">
          <div className="container">
            <div className="row align-items-center row-mobile">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des wow fadeInLeft" data-wow-delay="0.3s">
                  <div className="icon">
                    <img alt="" src={IconGet}/>
                  </div>
                  <h3>Get paid to create</h3>
                  <p>Relica allows anyone in the world with a phone and internet connection to start generating income
                    from their pictures with just a few taps and a touch of creativity.
                  </p>
                  <a href="#" className="button button-link">
                    Get Started <span className="arrow"></span>
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="thumb wow fadeInRight" data-wow-delay="0.4s">
                  <img alt="" src={LandingPage2}/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="block-three pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="thumb wow fadeInUp" data-wow-delay="0.3s">
                  <img alt="" src={LandingPage3}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des des-fix wow fadeInRight" data-wow-delay="0.3s">
                  <div className="max380">
                    <h3>Ad-free <br/>social media</h3>
                    <p>Say goodbye to invasive ads. Relica is built on bitcoin enabling you a safe, private and 
                      ad-free social media experience. Relica also never sells your data. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block-four wow fadeInUp" data-wow-delay="0.3s">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="des">
                  <img alt="" src={IBg}/>
                  <h3>Pay-to-view with Micropayments</h3>
                  <p>Relica allows you to set a fee to ulock your exclusive content. Your earning capacity on Relica
                    is only limited by your imagination.</p>

                  <div className="side-me">
                    <p>Slide me</p>
                    <SliderContainer>
                      <StyledSlider
                        renderTrack={(props, state) => <StyledTrack {...props} index={state.index}
                                                                    value={state.value}/>}
                        renderThumb={(props) => <StyledThumb {...props} />}
                        onChange={val => setSlideValue(val)}
                        value={slideValue}
                        min={0.01}
                        max={100}
                        step={0.01}
                        prefix={"$"}
                      />
                    </SliderContainer>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="text-center">
                  <div className="thumb">
                    <span className="side-value">$ {slideValue}</span>
                    <img alt="" src={LandingI1} width={"592px"}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block-map wow fadeInUp" data-wow-delay="0.3s">
          <div className="container" style={{padding: "50px 0"}}>
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12" >
                <div className="thumb">
                  <img alt="" src={LandingMap} width={"592px"}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="map">
                  <div className="map-inner">
                    <h3>Seeking adventure? Explore Relica’s world map with GPS to collect photos and Bitcoin</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block-five">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12 col-12">
                <div className="thumb wow fadeInUp" data-wow-delay="0.3s">
                  <img alt="" src={LandingPage4}/>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-12">
                <div className="des wow fadeInRight" data-wow-delay="0.4s">
                  <ul>
                    <li>
                      <div className="icon">
                        <img alt="" src={Icon1}/>
                      </div>
                      <p>Earn income from pictures</p>
                    </li>
                    <li>
                      <div className="icon">
                        <img alt="" src={Icon2}/>
                      </div>
                      <p>Decentralised social media</p>
                    </li>
                    <li>
                      <div className="icon">
                        <img alt="" src={Icon3}/>
                      </div>
                      <p>Access new followers</p>
                    </li>
                    <li>
                      <div className="icon">
                        <img alt="" src={Icon4}/>
                      </div>
                      <p>No data onselling</p>
                    </li>
                    <li>
                      <div className="icon">
                        <img alt="" src={Icon5}/>
                      </div>
                      <p>Referral bonuses</p>
                    </li>
                    <li>
                      <div className="icon">
                        <img alt="" src={Icon6}/>
                      </div>
                      <p>Built on Bitcoin</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block-six">
          <div className="container">
            <h3 className="wow fadeInUp" data-wow-delay="0.3s">How it works in<br/> three easy steps</h3>
            <div className="flex">
              <div className="flex-col">
                <div className="item wow fadeInUp" data-wow-delay="0.3s">
                  <div className="thumb">
                    <img alt="" src={Step1}/>
                  </div>
                  <div className="des">
                    <h4>1. Click Sign up</h4>
                    <p>Follow the steps to create a wallet linked to Relica account.</p>
                  </div>
                </div>
              </div>
              <div className="flex-col wow fadeInUp" data-wow-delay="0.4s">
                <div className="item">
                  <div className="thumb">
                    <img alt="" src={Step2}/>
                  </div>
                  <div className="des">
                    <h4>2. Capture and post your first photo</h4>
                    <p>After navigating through the app, you’ll be able to post your first photo with our easy to use
                      interface.</p>
                  </div>
                </div>
              </div>
              <div className="flex-col wow fadeInUp" data-wow-delay="0.5s">
                <div className="item">
                  <div className="thumb">
                    <img alt="" src={Step3}/>
                  </div>
                  <div className="des">
                    <h4>3. Monetize and profit from your photos</h4>
                    <p>Once you've posted, other friends can comment, like, follow and reward you for your content and
                      you begin earning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block-seven wow fadeInUp" data-wow-delay="0.3s">
          <div className="container">
            <div className="inner">
              <div className="content">
                <div className="des">
                  <h3>Join Us!</h3>
                  <p>Do you have amazing content?</p>
                  <Link to={"/become-influencer"}>BECOME AN INFLUENCER FOR RELICA</Link>
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

export default LandingPage;
