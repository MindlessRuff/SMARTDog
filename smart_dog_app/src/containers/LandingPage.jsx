import React from "react";
import { Grid, Cell } from "react-mdl";

const LandingPage = () => {
  return (
    <body>
      {/* Start Langing Page Section */}
      <div>
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner">
              <img
                src="https://tinyurl.com/y5c69osy"
                alt="landing"
                className="landing-img"
              />
            </div>
          </div>
        </div>
        <div className="caption text-center">
          <h1>Welcome to SmartDog</h1>
          <h4>A one of a kind smart dog collar for your furry friend</h4>
          <a className="btn btn-outline-light btn-lg" href="/works">
            Learn More
          </a>
        </div>
      </div>

      {/* Start Slogan Section */}
      <div className="offset">
        <div class="col-12 narrow text-center">
          <h1>SmartDog gives you ease of mind</h1>
          <h3 className="lead">
            Freedom to let your dog run without any worries
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
                    className="fas fa-play-circle fa-4x"
                    data-fa-transform="shrink-3 up-6"
                  ></i>
                  <h4>Sick Battery Life!</h4>
                  <p>
                    Trust that our battery will last very long. (10 hours
                    long!!!)
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature">
                  <i
                    className="fas fa-play-circle fa-4x"
                    data-fa-transform="shrink-3 up-5"
                  ></i>
                  <h4>Geo Fencing Bruh!</h4>
                  <p>
                    Alerts you when your dog runs outside the boundaries you set
                    >:)
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature">
                  <i
                    className="fas fa-play-circle fa-4x"
                    data-fa-transform="shrink-3 up-5"
                  ></i>
                  <h4>You Get Laura!</h4>
                  <p>
                    This chick Laura is awesome! Low power plus no monthly
                    subscriptions? Say no mas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Preorder Section */}
      <div className="col-12 narrow text-center">
        <p className="lead">Want to preorder our wonderful SmartDog collar?</p>
        <a className="btn btn-secondary btn-md" href="http://google.com">
          Preorder Now
        </a>
      </div>
      {/* Start Footer Section */}
      <div id="contact" className="offset">
        <footer>
          <div className="row justify-content-center">
            <div class="col-md-5 text-center">
              <img src=""></img>
              <p>
                SmartDog was created by a bunch of smartdawgs who love dogs.
              </p>
              <strong>Contact Info</strong>
              <p>smartdog-sdsu@gmail.com</p>
            </div>
          </div>
        </footer>
      </div>
    </body>
  );
};

export default LandingPage;
