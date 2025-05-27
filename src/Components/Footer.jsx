import React from "react";
import Logo from "../assets/img/Logo-footer.svg";

const Footer = () => {
  const footerStyles = {
    footer : {
     marginTop: "100px !impotant",
    },
    footerWidgetsWrapper: {
      padding: "30px 0px 30px",
      backgroundImage: "url('assets/img/footer-widgets-bg.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
    },
    textWhite: {
      color: "rgba(255, 255, 255, 1) !important",
    },
    footerBottom: {
      backgroundColor: "#fff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "27px",
      color: "#000",
    },
    copyRights: {
      textAlign: "center",
      marginBottom:"0px"
    },
  };

  return (
    <footer className="footer-1 footer-wrap">
      <div
        className="footer-widgets-wrapper text-white bg-cover"
        style={footerStyles.footerWidgetsWrapper}
      >
        <div className="container container-lg">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-xl-4">
              <div className="about-quantech pe-md-5 pe-xl-0">
                <a href="https://www.prehome.in/">
                  <img src={Logo} alt="Prehome" />
                </a>
                <p
                  className="pt-md-4 pt-sm-4 mt-4 pb-md-3 pb-sm-1 f-24"
                  style={footerStyles.textWhite}
                >
                  <b>Redefining Homeownership</b>
                </p>
              </div>
            </div>

            <div className="col-sm-12 col-md-5 col-xl-4">
              <div className="row">
                <div className="col-sm-4 col-xl-6 pt-md-4 pt-sm-0">
                  <div className="single-footer-wid ps-xl-5">
                    <ul>
                      <li><a href="https://www.prehome.in/">Home</a></li>
                      <li><a href="https://www.prehome.in/ourstory">Our Story</a></li>
                      <li><a href="https://www.prehome.in/blogs">Blogs</a></li>
                      <li><a href="https://www.prehome.in/contactus">Contact us</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-12 col-md-8 col-xl-6 pt-md-4 pt-sm-0">
                  <div className="single-footer-wid ps-xl-2">
                    <ul>
                      <li><a href="https://www.prehome.in/termsandconditions">Terms and Conditions</a></li>
                      <li><a href="https://www.prehome.in/privacypolicy">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 col-xl-4">
              <div className="single-footer-wid site-info-widget ps-xl-5">
                <div className="wid-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="get-in-touch">
                  <div className="single-contact-info">
                    <div className="contact-info">
                      <h5>Email</h5>
                      <p><u>contact@prehome.in</u></p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-info">
                      <h5>Phone</h5>
                      <p><u>+91 88006 58299</u></p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-info">
                      <h5>Office</h5>
                      <p>BC-1A, DDA Flats, Munirka, New Delhi-110067</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={footerStyles.footerBottom}>
        <div className="container container-lg align-items-center">
          <div className="bottom-content-wrapper">
            <div className="row">
              <div className="col-md-12 col-12 text-center">
                <div className="copy-rights" style={footerStyles.copyRights}>
                  <p className="mb-0">Prehome 2025 All Copyrights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;