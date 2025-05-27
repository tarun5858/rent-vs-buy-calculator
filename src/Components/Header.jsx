import React, { useState } from "react";
import "../assets/css/App.css";
import icon from "../assets/24/prehomeLogo.png";
import "../assets/css/bootstrap.min.css";
import BootstrapModal from "./BootstrapModal"; // Adjust path as needed
import zIndex from "@mui/material/styles/zIndex";
import { FaChevronDown } from "react-icons/fa";
import './Header.css';
// import {useMediaQuery} from "@mui/material";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const isDesktop = useMediaQuery("(min-width:1200px)");
    const [openModal, setOpenModal] = useState(false);

    // Function to handle modal open and close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

    const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <header className="header-1">
        <div className="container container-lg">
          <div className="row align-items-center justify-content-between">
            {/* Logo */}
            <div className="col-lg-1 col-sm-3 col-md-3 col-6 pr-lg-5">
              <div className="logo">
                <a href="https://www.prehome.in/">
                  <img src={icon} alt="Prehome" />
                </a>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="col-lg-11 text-end p-lg-0 d-none d-lg-flex justify-content-between align-items-center">
              <div className="menu-wrap">
                <div className="main-menu">
                  <ul>
                    <li><a href="https://www.prehome.in/howitworks">How it works</a></li>
                    <li><a href="https://prehome-latest-build.vercel.app/success.html">Success Stories</a></li>
                    <li className="mobile-dropdown dropdown">
                      <a href="javascript:void(0);" className="dropdown-toggle">Resources <FaChevronDown /> </a>
                      <ul className="dropdown-menu">
                        <li><a href="https://www.prehome.in/blogs">Blogs</a></li>
                        <li><a href="https://www.prehome.in/contactus">FAQs</a></li>
                        <li><a href="https://prehome-latest-build.vercel.app/calculators.html">Calculators</a></li>
                      </ul>
                    </li>
                    <li className="mobile-dropdown dropdown">
                      <a href="" className="dropdown-toggle">Company <FaChevronDown /> </a>
                      <ul className="dropdown-menu">
                        <li><a href="https://www.prehome.in/ourstory">Our Story</a></li>
                        <li><a href="https://www.prehome.in/contactus">Contact Us</a></li>
                        <li><a href="https://www.prehome.in/termsandconditions">Terms & Conditions</a></li>
                        <li><a href="https://www.prehome.in/privacypolicy">Privacy Policy</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="header-right-element">
                <a
                  className="theme-btn-navbar btn-radius animated"
                  data-animation-in="fadeInRight"
                  data-delay-in="0.9"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Join our waitlist
                </a>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="d-block d-lg-none col-sm-1 col-md-8 col-6">
              <div className="mobile-nav-wrap">
                {/* Hamburger Icon */}
                       <div
  id="hamburger"
  onClick={() => setIsOpen(true)}
  style={{
    cursor: "pointer",
    position: "absolute",
    right: "12px", // Move slightly to the right
    top: "20px", // Move slightly lower
    zIndex: 1000,
    width: "48px", // Slightly larger circle
    height: "48px", // Slightly larger circle
    backgroundColor: "#007FAD", // Blue background
    borderRadius: "50%", // Make it a circle
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33" // Increase the size of the lines
    height="33" // Increase the size of the lines
    fill="white" // White color for the lines
    className="bi bi-list"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M2 12a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5z"
    />
  </svg>
</div>

         {isOpen && (
  <div
    className="mobile-nav"
   style={{
    position: "fixed",
    top: "30px", // Add some space from the top
    right: "10px", // Add a small margin on the right
    left: "10px", // Add a small margin on the left
    width: "calc(100% - 20px)", // Adjust width to leave space on both sides
    height: "auto", // Adjust height to fit content
    zIndex: 9999,
    padding: "20px", // Add padding inside the box
    overflowY: "auto", // Allow scrolling if content exceeds the viewport
    backgroundColor: "#007FAD", // Background color
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
    borderRadius: "20px", // Optional: Add rounded corners
  }}
  >
    {/* Close Icon */}
    <button
  className="close-nav"
  style={{
    position: "absolute",
    // right: "20px",
    top: "15px",
    background: "none",
    border: "none",
    fontSize: "28px",
    color: "white",
    cursor: "pointer"
  }}
  onClick={() => setIsOpen(false)}
>
  ×
</button>

 
    <nav className="sidebar-nav text-white">
      <ul 
      style={{
         listStyle: "none", 
         backgroundColor: "#007FAD", // Set the background color
         color: "white",
           padding: "8px 15px 28px 15px",
         }}>
       <li style={{marginBottom: "15px"}}>
    <a href="https://www.prehome.in" className="text-white d-block py-2" style={{textDecoration:"none"}}>
      Home
    </a>
  </li>
      <li style={{marginBottom: "15px"}}>
          <a
            href="https://www.prehome.in/howitworks"
            className="text-black d-block py-2"
            style={{textDecoration:"none"}}
          >
            How it works
          </a>
        </li>
       <li style={{marginBottom: "15px"}}>
          <a
            href="https://prehome-latest-build.vercel.app/success.html"
            className="text-white d-block py-2"
            style={{textDecoration:"none"}}
          >
            Success Stories
          </a>
        </li>
       <li style={{marginBottom: "15px"}}>
          <details>
          <summary
    className="cursor-pointer py-2 text-white"
    style={{
      display: "flex",
      justifyContent: "space-between", // Align text and arrow
      alignItems: "center", // Vertically center the arrow
      cursor: "pointer",
    }}
  >
    Resources
    <span
      style={{
        marginLeft: "auto", // Push the arrow to the right
        
      }}
    
    >
      <FaChevronDown />
    </span>
  </summary>
            <ul
              style={{
                padding: "10px 15px",
                marginTop: "8px",
                marginLeft: "10px",
                backgroundColor: "#007FAD",
                // borderRadius: "8px",
                // border: "1px solid #ddd",
              }}
            >
            <li style={{marginBottom: "10px"}}>
                <a href="https://www.prehome.in/blogs" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  Blogs
                </a>
              </li>
              <li style={{marginBottom: "10px"}}>
                <a href="https://www.prehome.in/contactus" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  FAQs
                </a>
              </li>
             <li style={{marginBottom: "10px"}}>
                <a href="https://prehome-latest-build.vercel.app/calculators.html" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  Calculators
                </a>
              </li>
            </ul>
          </details>
        </li>
        <li style={{marginBottom: "15px"}}>
          <details>
           <summary
    className="cursor-pointer py-2 text-white"
    style={{
      display: "flex",
      justifyContent: "space-between", // Align text and arrow
      alignItems: "center", // Vertically center the arrow
      cursor: "pointer",
    }}
  >
    Company
    <span
      style={{
        marginLeft: "auto", // Push the arrow to the right
       
      }}
     
    >
      <FaChevronDown />
    </span>
  </summary>
            <ul
              style={{
                padding: "10px 15px",
                marginTop: "8px",
                marginLeft: "10px",
                backgroundColor: "#007FAD",
                // borderRadius: "8px",
                // border: "1px solid #ddd",
              }}
            >
             <li style={{marginBottom: "10px"}}>
                <a href="https://www.prehome.in/ourstory" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  Our Story
                </a>
              </li>
             <li style={{marginBottom: "10px"}}>
                <a href="https://www.prehome.in/contactus" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  Contact Us
                </a>
              </li>
              <li style={{marginBottom: "10px"}}>
                <a href="https://www.prehome.in/termsandconditions" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  Terms & Conditions
                </a>
              </li>
              <li style={{marginBottom: "10px"}}>
                <a href="https://www.prehome.in/privacypolicy" className="text-white d-block py-1" style={{textDecoration:"none"}}>
                  Privacy Policy
                </a>
              </li>
            </ul>
                    {/* Mobile "Join our waitlist" Button */}
          </details>
          
        </li>
<div
    className="mobile-waitlist-btn"
    onClick={handleOpenModal}
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Join our waitlist
  </div>
      </ul>
    </nav>
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bootstrap Modal Component */}
      <BootstrapModal />
    </>
  );
};

export default Header;
