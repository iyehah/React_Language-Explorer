import React from "react";
import logo from "../ImageData/Images/code.png";
import "./Card.css";

const Card = (props) => {
  const { card, handleChoice, flipped, disabled } = props;
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img
          onClick={handleClick}
          src={logo}
          alt="card back"
          className="back"
        />
      </div>
    </div>
  );
};

export default Card;