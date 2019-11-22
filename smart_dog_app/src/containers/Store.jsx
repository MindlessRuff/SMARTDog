import React from "react";
import Footer from "../components/Footer";

const Store = () => {
  return (
    <div>
      <div className="product">
        <div className="product-image">
          <img
            src="https://252221-784080-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2017/02/41Liw1mgVZL.jpg"
            alt=""
          ></img>
        </div>
        <div className="product-info">
          <h2>Original one of a kind SmartDog Attatchment Collar</h2>
          <span className="product-description">Sick Dog Collar</span>
          <span className="product-price">ONLY $99.99</span>
        </div>
      </div>
      {/* Footer Component*/}
      <Footer />
    </div>
  );
};

export default Store;
