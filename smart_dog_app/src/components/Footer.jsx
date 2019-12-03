import React from "react";

const Footer = function(props) {
  return (
    <div id="contact" className="offset">
      <footer>
        <div className="row justify-content-center">
          <div className="col-md-5 text-center">
            <img
              src="https://cdn.dribbble.com/users/1421577/screenshots/4860653/dog-sleeping.gif"
              alt="footerimg"
              className="footer-img"
            />
            <br></br>
            <h4>Contact Info</h4>
            <p>smartdog-sdsu@gmail.com</p>
            <p>© 2020 SmartDog SDSU</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
