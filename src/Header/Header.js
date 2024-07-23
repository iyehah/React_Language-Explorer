import React from "react";

const Header = ({ onShuffle }) => {
  return (
    <React.Fragment>
      <h1 className="header">Asia Explorer</h1>
      <button onClick={onShuffle}>New Game</button>
    </React.Fragment>
  );
};

export default Header;
