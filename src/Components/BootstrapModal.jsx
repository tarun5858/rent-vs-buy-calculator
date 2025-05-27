import React, { useState } from "react";
import "./StepIndicator.css";
import { href } from "react-router-dom";

const BootstrapModal = () => {
  const [currentTab, setCurrentTab] = useState(1); // State to track the current tab
  const [selectedLayout, setSelectedLayout] = useState(""); // State to track the selected layout
  const [selectedLocation, setSelectedLocation] = useState(""); // State to track the selected location

  const nextPrevHeader = (step) => {
    setCurrentTab((prevTab) => {
      const newTab = prevTab + step;
      return newTab < 1 ? 1 : newTab > 2 ? 2 : newTab; // Ensure the tab stays between 1 and 2
    });
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
   const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    console.log("Validating form data:", formData);
    if (!formData.name.trim()) {
      console.log("Name is required");
      newErrors.name = "Name is required";
    
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces";
   
    }
    if (!selectedLocation) {
    newErrors.location = "Please select a location";
  }
 if (!selectedLayout) {
    newErrors.layout = "Please select a layout";
  }
    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    //   newErrors.email = "Invalid email format";
    // }

    // if (!formData.phone.trim()) {
    //   newErrors.phone = "Phone number is required";
    // } else if (!/^\d{10}$/.test(formData.phone)) {
    //   newErrors.phone = "Phone number must be 10 digits";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    const validate1 = () => {
    console.log("Validating form data: validate1", formData);
    const newErrors = {};
    
   

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const handleLayoutSelection = (value) => {
    setSelectedLayout(value); // Update the selected layout
  };

  const handleLocationSelection = (value) => {
    setSelectedLocation(value); // Update the selected location
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && validate1()) {
      // Form is valid — proceed to submit or process the data
      console.log("Form submitted:", formData);
    }
  };

  return (
    
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header border-0">
  
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Form */}
          <form
            id="prehomeForm"
            action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&amp;orgId=00DC40000026yrZ"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="modal-body">
              <div className="popuprow">
                {/* Tab 1 */}
                <div
                  className="tab"
                  style={{ display: currentTab === 1 ? "block" : "none" }}
                >
                  <div>
                    <h3
                      className="title-color2"
                      style={{
                        marginBottom: "5px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingTop: "0px",
                        marginTop: "0px",
                      }}
                      id="exampleModalLabel"
                    >
                      Join Our Waitlist
                    </h3>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "14px",
                         paddingTop: "0px",
                         marginTop: "5px",
                      }}
                    >
                      Be the first to know about our upcoming homes near you!
                    </p>
                  </div>

                  {/* Name Input */}
                 <div className="col-md-12">
  <div className="mb-0">
    <label htmlFor="last_name" style={{ textAlign: "left" }}>
      Name
    </label>
    <input
      type="text"
      id="last_name"
      name="last_name"
      className="form-control form-box"
      placeholder="Full Name"
      value={formData.name}
      onChange={(e) =>
        setFormData({ ...formData, name: e.target.value })
      }
      style={{
        borderColor: errors.name ? "red" : "#ced4da", // Change border color based on error
      }}
      required
    />
    {errors.name && (
      <span style={{ color: "red", fontSize: "12px" }}>
        {errors.name}
      </span>
    )}
  </div>
</div>
                  {/* Location Buttons */}
           <div className="col-md-12">
  <div className="row">
    <label style={{ textAlign: "left" }}>
      I’d like my new home in:
    </label>
    <div
      className="row"
      role="group"
      aria-label="Basic example"
    >
      <div className="col-12">
        <button
          type="button"
          className="btn-group location-btn"
          data-value="Golf Course Road"
          onClick={() => handleLocationSelection("Golf Course Road")}
          style={{
            padding: "10px 20px",
            border: selectedLocation === "Golf Course Road" ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedLocation === "Golf Course Road" ? "#0086AD" : "#f3f3f3",
            color: selectedLocation === "Golf Course Road" ? "#fff" : "#333",
            transition: "all 0.3s",
            margin: "5px",
            cursor: "pointer",
            borderRadius:"25px"
          }}
        >
          Golf Course Road
        </button>
        <button
          type="button"
          className="btn-group location-btn"
          data-value="Golf Course Extension Road"
          onClick={() =>
            handleLocationSelection("Golf Course Extension Road")
          }
          style={{
            padding: "10px 20px",
            border: selectedLocation === "Golf Course Extension Road" ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedLocation === "Golf Course Extension Road" ? "#0086AD" : "#f3f3f3",
            color: selectedLocation === "Golf Course Extension Road" ? "#fff" : "#333",
            transition: "all 0.3s",
            margin: "5px",
            cursor: "pointer",
            borderRadius:"25px"
          }}
        >
          Golf Course Extension Road
        </button>
        <button
          type="button"
          className="btn-group location-btn"
          data-value="Southern Peripheral Road"
          onClick={() =>
            handleLocationSelection("Southern Peripheral Road")
          }
          style={{
            padding: "10px 20px",
            border: selectedLocation === "Southern Peripheral Road" ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedLocation === "Southern Peripheral Road" ? "#0086AD" : "#f3f3f3",
            color: selectedLocation === "Southern Peripheral Road" ? "#fff" : "#333",
            transition: "all 0.3s",
            margin: "5px",
            cursor: "pointer",
            borderRadius:"25px"
          }}
        >
          Southern Peripheral Road
        </button>
        <button
          type="button"
          className="btn-group location-btn"
          data-value="Dwarka Expressway"
          onClick={() =>
            handleLocationSelection("Dwarka Expressway")
          }
          style={{
            padding: "10px 20px",
            border: selectedLocation === "Dwarka Expressway" ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedLocation === "Dwarka Expressway" ? "#0086AD" : "#f3f3f3",
            color: selectedLocation === "Dwarka Expressway" ? "#fff" : "#333",
            transition: "all 0.3s",
            margin: "5px",
            cursor: "pointer",
            borderRadius:"25px"
          }}
        >
          Dwarka Expressway
        </button>
        <button
          type="button"
          className="btn-group location-btn"
          data-value="Sohna Road"
          onClick={() => handleLocationSelection("Sohna Road")}
          style={{
            padding: "10px 20px",
            border: selectedLocation === "Sohna Road" ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedLocation === "Sohna Road" ? "#0086AD" : "#f3f3f3",
            color: selectedLocation === "Sohna Road" ? "#fff" : "#333",
            transition: "all 0.3s",
            margin: "5px",
            cursor: "pointer",
            borderRadius:"25px"
          }}
        >
          Sohna Road
        </button>
        <button
          type="button"
          className="btn-group location-btn"
          data-value="Other"
          onClick={() => handleLocationSelection("Other")}
          style={{
            padding: "10px 20px",
            border: selectedLocation === "Other" ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedLocation === "Other" ? "#0086AD" : "#f3f3f3",
            color: selectedLocation === "Other" ? "#fff" : "#333",
            transition: "all 0.3s",
            margin: "5px",
            cursor: "pointer",
            borderRadius:"25px"
          }}
        >
          Other
        </button>
      </div>
    </div>
    {/* Conditionally Render Input Field */}
    {selectedLocation === "Other" && (
      <input
        type="text"
        id="otherLocation"
        className="form-control mt-2"
        placeholder="E.g., Golf Course Road"
         style={{
      width: "55%", // Adjust the width as needed
      marginLeft: "15px",
    }}
      />
    )}
      {errors.location && (
      <span style={{ color: "red", fontSize: "12px" }}>{errors.location}</span>
    )}
  </div>
</div>
                  {/* Layout Buttons */}
                <div className="col-md-12">
  <label style={{ textAlign: "left" }}>I’d prefer my layout to be:</label>
  <div className="row gray-300 border-radius-50 rounded-3">
    <div className="col-4">
      <button
        type="button"
        className={`btn large-btn ${selectedLayout === "2 BHK" ? "selected" : ""}`}
        data-value="2 BHK"
        onClick={() => handleLayoutSelection("2 BHK")}
        style={{
          fontSize: "14px",
          padding: "30px 40px",
          background: selectedLayout === "2 BHK" ? "#ef9c00" : "lightgrey",
          borderRadius: "20px",
          height: "100px",
          width: "130px",
          marginBottom: "10px",
        }}
      >
        <img src="./assets/img/filter_2.png" alt="" />
        <span>2 BHK</span>
      </button>
    </div>
    <div className="col-4">
      <button
        type="button"
        className={`btn large-btn ${selectedLayout === "3 BHK" ? "selected" : ""}`}
        data-value="3 BHK"
        onClick={() => handleLayoutSelection("3 BHK")}
        style={{
          fontSize: "14px",
          padding: "30px 40px",
          background: selectedLayout === "3 BHK" ? "#ef9c00" : "lightgrey",
          borderRadius: "20px",
          height: "100px",
          width: "130px",
          marginBottom: "10px",
        }}
      >
        <img src="./assets/img/filter_3.png" alt="" />
        <span>3 BHK</span>
      </button>
    </div>
    <div className="col-4">
      <button
        type="button"
        className={`btn large-btn ${selectedLayout === "Other" ? "selected" : ""}`}
        data-value="Other"
        onClick={() => handleLayoutSelection("Other")}
        style={{
          fontSize: "14px",
          padding: "30px 40px",
          background: selectedLayout === "Other" ? "#ef9c00" : "lightgrey",
          borderRadius: "20px",
          height: "100px",
          width: "130px",
          marginBottom: "10px",
        }}
      >
        <img src="./assets/img/more_horiz.png" alt="" />
        <span>Other</span>
      </button>
    </div>
  </div>

  {/* Conditionally Render Input Field */}
  {selectedLayout === "Other" && (
    <input
      type="text"
      id="otherPropertyType"
      className="form-control mt-2"
      placeholder="E.g., 4BHK"
      style={{
        fontSize: "14px",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    />
  )}
  <p
  style={{
    margin: "0",
    color: "#7F7F7F",
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: "1.2"
  }}
>
  We’re here to help you find the right home—your info stays safe with us.
</p>
 {errors.layout && (
    <span style={{ color: "red", fontSize: "12px" }}>{errors.layout}</span>
  )}
</div>
                </div>

                {/* Tab 2 */}
                <div
                  className="tab"
                  style={{
                     display: currentTab === 2 ? "block" : "none",
                     marginTop: "10px", // Reduced top margin
    paddingTop: "0px", 
                    }}
                >
                  <div>
                    <h3
                      className="title-color2"
                      style={{ marginBottom: "5px",fontSize: "20px",
        fontWeight: "bold",
        marginTop: "0px", }}
                      id="exampleModalLabel"
                    >
                      Tell us about yourself
                    </h3>
                    <p
                      className="title-color2"
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        marginTop: "0px",
                      }}
                    >
                      Your details
                    </p>
                  </div>

                  {/* Phone Input */}
                  <div className="col-md-12 mt-3">
                    <label htmlFor="phone" style={{ textAlign: "left" }}>
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="form-control form-box"
                      placeholder="+91"
                     
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      style={{
      borderColor: errors.phone ? "red" : "#ced4da", // Change border color based on error
    }}
                      required
                    />
                    {errors.phone && (
    <span style={{ color: "red", fontSize: "12px" }}>
      {errors.phone}
    </span>
  )}
                  </div>

               {/* Email Input */}
<div className="col-md-12 mt-3">
  <label htmlFor="email" style={{ textAlign: "left" }}>
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    className="form-control form-box"
    placeholder="Email Address"
    value={formData.email}
    onChange={(e) =>
      setFormData({ ...formData, email: e.target.value })
    }
     style={{
      borderColor: errors.email ? "red" : "#ced4da", // Change border color based on error
    }}
    required
  />
   {errors.email && (
    <span style={{ color: "red", fontSize: "12px" }}>
      {errors.email}
    </span>
  )}
</div>

{/* Additional Content */}
<label
  style={{
    fontSize: "12px",
    marginLeft: "10px",
    marginTop: "20px",
    display: "block",
  }}
>
  By clicking on the button below, you agree to the
  <a href="https://www.prehome.in/privacypolicy" className="privacy-policy"> privacy policy</a>
</label>

<p
  style={{
    margin: "0",
    color: "#7F7F7F",
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: "1.2",
  }}
>
  Your details are private—we’ll only reach out with updates that matter.
</p>

                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                id="prevBtn"
                onClick={() => nextPrevHeader(-1)}
                style={{ display: currentTab === 1 ? "none" : "inline-block" }}
                className="theme-btn-form-btn btn-radius"
              >
                Previous
              </button>
              <button
                type="button"
                id="nextBtn"
                onClick={() => {
                  if (validate()) {
                    nextPrevHeader(1); // Redirect to the second page only if validation passes
                  }
                }}
                style={{ display: currentTab === 2 ? "none" : "inline-block" }}
                className="theme-btn-form-btn btn-radius"
              >
                Add me to the waitlist
              </button>
              <button
  type="submit"
  style={{ display: currentTab === 2 ? "inline-block" : "none" }}
  className="theme-btn-form-btn btn-radius"
  onClick={(e) => {
    e.preventDefault(); // Prevent default form submission
    if (validate1()) {
      // Redirect to the thank-you page
      window.location.href = "https://www.prehome.in/thank-you";

      // Close the modal after 5 seconds
      setTimeout(() => {
        const modal = document.getElementById("exampleModal");
        if (modal) {
          modal.classList.remove("show");
          modal.style.display = "none";
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "auto";
          const backdrop = document.querySelector(".modal-backdrop");
          if (backdrop) {
            backdrop.remove();
          }
        }
      }, 5000);
    }
  }}
>
  Keep me posted
</button>
            </div>

            {/* Step Indicators */}
           {/* Step Indicators */}
<div style={{ textAlign: "center", marginTop: "20px" }}>
  <span className={`step ${currentTab === 1 ? "active" : ""}`}></span>
  <span className={`step ${currentTab === 2 ? "active" : ""}`}></span>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;