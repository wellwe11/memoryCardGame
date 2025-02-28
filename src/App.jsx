import GameContent from "./gameContent/gameDisplay";
import Form from "./form/form";
import { useState } from "react";

import "./App.css";

function App() {
  const [hideMenu, setHideMenu] = useState(false);

  const hideMenuFn = () => {
    setHideMenu(true);
  };

  return (
    <div>
      {hideMenu ? (
        <div className="headerContainer">
          <GameContent />
        </div>
      ) : (
        <Form hideMenuFn={hideMenuFn} />
      )}
    </div>
  );
}

export default App;
