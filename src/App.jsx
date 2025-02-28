import GameStart from "./form/form";
import { useState } from "react";

import "./App.css";

function App() {
  const [hideMenu, setHideMenu] = useState(false);

  const hideMenuFn = () => {
    setHideMenu(true);
  };

  return (
    <div>
      <GameStart />
    </div>
  );
}

export default App;
