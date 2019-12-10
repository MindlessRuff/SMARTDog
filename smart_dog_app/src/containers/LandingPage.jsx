import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      {/* Start Langing Page Section */}
      <div>
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner">
              <img
                src="https://images.unsplash.com/photo-1562176566-e9afd27531d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="landing"
                className="landing-img"
              />
            </div>
          </div>
        </div>
        <div className="caption text-center">
          <h1>Welcome to SmartDog</h1>
          <h4>A one of a kind smart dog collar for your furry friend</h4>
          <div>
            <Link style={{color: 'white'}} to={"/works/"}>
              <button type="button" className="btn btn-outline-light btn-lg">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Start Slogan Section */}
      <div className="offset-back">
        <div className="col-12 narrow text-center">
          <h1>SmartDog Gives You Ease Of Mind</h1>
          <h3 className="lead">
            We're on a mission to improve the lives of pets by empowering the
            people who love them. By combining pet science and technology, our
            product helps you care for your pet in ways not previously possible.
            Our top-rated wearables help every pet parent better understand
            their pet's needs, behaviors and well-being.
          </h3>
        </div>
      </div>

      {/* Start features section */}
      <div className="jumbotron">
        <div className="narrow">
          <div className="col-12">
            <h3 className="heading">Features</h3>
            <div className="heading-underline"></div>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="feature">
                  <i
                    className="fa fa-battery fa-4x"
                    data-fa-transform="shrink-3 up-6"
                  ></i>
                  <h4>Unbeatable Battery Life</h4>
                  <p>
                    Our device offer up to 24 full hours of battery life between
                    charges under normal uses. Our device is durable and well protected.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature">
                  <i
                    className="fa fa-map-marker fa-4x"
                    data-fa-transform="shrink-3 up-5"
                  ></i>
                  <h4>Tracking</h4>
                  <p>
                    Alerts you to your dog's location anytime from anywhere
                    within our specified distance. Set a Geo-Fence and go out
                    and enjoy your walk without worrying about your pup running
                    too far.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature">
                  <i
                    className="fa fa-microchip fa-4x"
                    data-fa-transform="shrink-3 up-5"
                  ></i>
                  <h4>Network & Service</h4>
                  <p>
                    Our Lorawan technology eliminates the subscription fees.
                    Just buy our device once and never pay for anything else.
                    ABSOLUTELY no hidden fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Subscribe Form */}
        <div>
          <div className="simple-subscription-form">
            <form>
              <h3>Subscribe</h3>
              <p>
                Enter your email to show support and get updates of our one of
                kind smart collar!
              </p>
              <div className="input-groups">
                <i className="fa fa-envelope fa-2x fa-fw"></i>
                <input
                  className="input-group-field"
                  type="email"
                  placeholder="Email"
                  required
                ></input>
                <button className="btn-email btn-outline-light btn-md">
                  Woof
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Start Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
