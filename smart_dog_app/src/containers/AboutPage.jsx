import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      {/* Start About Page Timeline */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>SmartDog Timeline</h1>
            <p>A Quick Representation Of Our Groups </p>
            <ul className="timeline">
              <li>
                <h5>January 20, 2019</h5>
                <p>Waht did we do...</p>
              </li>
              <li>
                <h5>June 10, 2019</h5>
                <p>Waht did we do...</p>
              </li>
              <li>
                <h5>August 29, 2019</h5>
                <p>Waht did we do...</p>
              </li>{" "}
              <li>
                <h5>December 10, 2019</h5>
                <p>Waht did we do...</p>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer Component
        <Footer /> */}
      </div>
    </div>
  );
};

export default About;
