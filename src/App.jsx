import { useState } from "react";
import Menu from "./menu/menu";
import GameContent from "./gameContent/gameDisplay";

import "./App.css";

function Header() {
  return <div></div>;
}

function App() {
  return (
    <div>
      <div className="flexCenterRow menuContainer" style={{ display: "none" }}>
        <Menu />
      </div>
      <div className="headerContainer">
        <GameContent />
      </div>
    </div>
  );
}

export default App;
