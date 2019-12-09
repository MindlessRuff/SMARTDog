import React from "react";

const Footer = function(props) {
  return (
    <div id="contact" className="contact-footer">
      <footer>
        <div className="row justify-content-center">
          <div className="col-md-5 text-center">
            <img
              src="https://cdn.dribbble.com/users/1421577/screenshots/4860653/dog-sleeping.gif"
              alt="footerimg"
              className="footer-img"
            />
            <p>smartdog-sdsu@gmail.com</p>
            <p>© 2020 SmartDog SDSU</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
